import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ChessService} from "../chessService";
import {userConnection, userPlayMove} from "../bodyModelHTTPRequest";
import {BOARD, givePiece} from "../pieceList";
import {interval, Observable, Subscription, timer} from "rxjs";
import {switchMap} from "rxjs/operators";
import {parse} from "@angular/compiler/src/render3/view/style_parser";
import {over} from "stompjs";
import * as SockJS from "sockjs-client";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
const isSubmitted = form && form.submitted;
return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
}
}

@Component({
selector: 'app-chess-board',
templateUrl: './chess-board.component.html',
styleUrls: ['./chess-board.component.scss']
})


export class ChessBoardComponent implements OnInit {

    playerDatas = <userConnection>{};
    fetchedChosenMove : String = "";
    teamCanPlayFlag : boolean | undefined;

    @Input()
    moveField : string = "";

    board  = JSON.parse(JSON.stringify(BOARD));
    serverResponse : string = "";
    stompClient = over(new SockJS('http://localhost:8080/api/socket'));


    isEven(n: number) {
        return n % 2 == 0;
    }

    colorBoard(x: number, y: number){
        if (this.isEven(x)){
          if(this.isEven(y)){
            return "beige";
          }
          else{
            return "brown";
          }
        }
        else{
          if(this.isEven(y)){
            return "brown";
          }
          else{

            return "beige";
          }
        }
    }

    numberToLetter(x : number){
        return String.fromCharCode(x + 64);
    }

    moveFormControl = new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-hA-H][0-8][a-hA-H][0-8]$")
    ])

    matcher = new MyErrorStateMatcher();

    parseInputMove(move : string){
        //from "C1H2" -> "3182"
        return String(move.toUpperCase().charCodeAt(0)-64)+move[1]+String(move.toUpperCase().charCodeAt(2)-64)+move[3];

    }

    parseOutputMove(move : string){
        let temp = JSON.parse(move);
        console.log(temp.x1Coord.toString() + temp.y1Coord.toString() +
            temp.x2Coord.toString() + temp.y2Coord.toString());
        return temp.x1Coord.toString() + temp.y1Coord.toString() +
            temp.x2Coord.toString() + temp.y2Coord.toString();
    }

    validateMove(move: string){
        let pieceBoard = BOARD[Number(move[0])-1][Number(move[1])-1];
        let piece = givePiece(pieceBoard[0]);
        if(piece?.type == undefined){

          return false;
        }
        else
        {
          let color = pieceBoard[1];
          if ((color == 'n' && this.playerDatas.team == 1) ||
            (color == 'b' && this.playerDatas.team == 0)){
            return piece?.verifyMove(parseInt(move[0])-1,
              parseInt(move[1])-1,
              parseInt(move[2])-1,
              parseInt(move[3])-1
            );
          }
          return false;
        }
    }

    onSubmit(){
        if (this.moveFormControl.valid) {
          //parseMove and check if move is valid
          let move = this.parseInputMove(this.moveFormControl.value);
          if (this.validateMove(move)) {
            let bodyMove = {
              "player": this.playerDatas.name,
              "game_id": this.playerDatas.id_game,
              "x1Coord": parseInt(move[0]),
              "y1Coord": parseInt(move[1]),
              "x2Coord": parseInt(move[2]),
              "y2Coord": parseInt(move[3])
            }

            // let body : string = this.playerDatas.name + ", " +
            //                     this.playerDatas.id_game + ", " +
            //                     parseInt(move[0]) + ", " +
            //                     parseInt(move[1]) + ", " +
            //                     parseInt(move[2]) + ", " +
            //                     parseInt(move[3]);

            this.stompClient.send('/message/submitMove', {}, JSON.stringify(bodyMove));
            // this.chessService.voteMovePost(bodyMove).subscribe(
            //   res => {this.serverResponse = "Vote fait";},
            //   error => {console.log(error)}
            // )
          } else {
            //TODO: Move invalid dans le moveFormControl
            //this.moveFormControl['pattern'].setErrors({'incorrect': true});
            console.log("Move invalid");
          }

          this.moveFormControl.reset();
        }
    }

    private movePieceOnBoard(res: String) {
        // le back renvoie un move sous forme (xxyy) avec x et y int
        if(res.length == 4){
        // on vérifie que le move n'est pas celui joué au tour d'avant
            if (res != this.fetchedChosenMove){
              this.fetchedChosenMove = res;
              let temp = this.board[parseInt(res.charAt(0))-1][parseInt(res.charAt(1))-1];
              this.board[parseInt(res.charAt(0))-1][parseInt(res.charAt(1))-1] = 'X';
              this.board[parseInt(res.charAt(2))-1][parseInt(res.charAt(3))-1] = temp;
                // this.board[0][0] = 'X';
                // this.board[5][0] = temp;
              //Disable player input for enemy turn
              this.teamCanPlayFlag = !this.teamCanPlayFlag;
              this.serverResponse = "";
            }
        }
    }

    quitGame(){
      //TODO: sortir le joueur de la bdd
    }

    constructor(private activatedRoute: ActivatedRoute, private chessService: ChessService) { }


    ngOnInit(): void {
        //keep data on reload
        if(history.state.data){
            this.playerDatas = history.state.data;
            sessionStorage.setItem('player_Datas', JSON.stringify(this.playerDatas));
        }else{
            this.playerDatas = JSON.parse(<string>sessionStorage.getItem('player_Datas'));
        }
        // 1 = black
        if(this.playerDatas.team == 1){
            this.teamCanPlayFlag = false;
        }
        else{
            this.teamCanPlayFlag = true;
        }

        //WebSocket
        const _this = this;
        this.stompClient.connect({}, function(frame) {
            console.log('Connected: ' + frame);
            _this.stompClient.subscribe('/chat/chosenMove', function(message) {
                _this.movePieceOnBoard(_this.parseOutputMove(message.body));
                console.log(_this.board)
            });
            console.log('Here2');
        })
    }

    ngOnDestroy() : void {
        // @ts-ignore
        //this.chosenMoveObservableRef.unsubscribe();
        this.stompClient.unsubscribe();
    }
}
