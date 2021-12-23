import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ChessService} from "../chessService";
import {userConnection, userPlayMove} from "../bodyModelHTTPRequest";
import {givePiece, initBOARD} from "../pieceList";
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

    board  = JSON.parse(JSON.stringify(initBOARD));
    serverResponse : string = "";
    stompClientMove = over(new SockJS('http://localhost:8080/api/socket'));
    stompClientPlayers = over(new SockJS('http://localhost:8080/api/socket'));
    listOfPlayers = undefined;
    nbBlanc = 0;
    nbNoir = 0;


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
        let x1 : number = (move.toUpperCase().charCodeAt(0) - 64)-1;
        let y1 : number = parseInt(move[1])-1;
        let x2 : number = (move.toUpperCase().charCodeAt(2) - 64)-1;
        let y2 : number = parseInt(move[3])-1;
        return x1.toString() + y1.toString() + x2.toString() + y2.toString();

    }

    parseOutputMove(move : string){
        let temp = JSON.parse(move);
        return temp.x1Coord.toString() + temp.y1Coord.toString() +
            temp.x2Coord.toString() + temp.y2Coord.toString();
    }

    validateMove(move: string){
        let pieceBoard = this.board[parseInt(move[0])][parseInt(move[1])];
        let piece = givePiece(pieceBoard[0]);
        if(piece?.type == undefined){
            return false;
        }
        else
        {
            let color = pieceBoard[1];
            if ((color == 'n' && this.playerDatas.team == 1) ||
                (color == 'b' && this.playerDatas.team == 0)){
                return piece?.verifyMove(parseInt(move[0]),
                    parseInt(move[1]),
                    parseInt(move[2]),
                    parseInt(move[3]),
                    pieceBoard,
                    this.board);
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
                this.stompClientMove.send('/message/submitMove/'+this.playerDatas.id_game, {}, JSON.stringify(bodyMove));
            } else {
                //TODO: Move invalid dans le moveFormControl
                //this.moveFormControl['pattern'].setErrors({'incorrect': true});
                console.log("Move invalid");
            }

          this.moveFormControl.reset();
        }
    }

    movePieceOnBoard(res: String) {
        // le back renvoie un move sous forme (xxyy) avec x et y int
        if(res.length == 4){
        // on vérifie que le move n'est pas celui joué au tour d'avant
            if (res != this.fetchedChosenMove){
                let x1 : number = parseInt(res.charAt(0));
                let y1 : number = parseInt(res.charAt(1));
                let x2 : number = parseInt(res.charAt(2));
                let y2 : number = parseInt(res.charAt(3));
                this.fetchedChosenMove = res;
                //TODO : roque
                if(this.isRoqueMove(x1,y1,x2,y2)){
                    if( y1 == 4){
                        //swap y1 et y2 pour pas dupliquer du code
                        let swap = y1;
                        y1 = y2;
                        y2 = swap;
                    }
                    let tour : string = this.board[x1][y1];
                    let roi : string = this.board[x2][y2];
                    if(y1 == 0){
                        //grand roque
                        this.board[x1][y1] = 'X';
                        this.board[x2][y2] = 'X';
                        this.board[x1][3] = tour;
                        this.board[x2][2] = roi;
                    }
                    else
                    {
                        //y1 == 7 / petit roque
                        this.board[x1][y1] = 'X';
                        this.board[x2][y2] = 'X';
                        this.board[x1][5] = tour;
                        this.board[x2][6] = roi;
                    }
                }
                else
                {
                    let temp = this.board[x1][y1];
                    this.board[x1][y1] = 'X';
                    this.board[x2][y2] = temp;
                }
                //Disable player input for enemy turn
                this.teamCanPlayFlag = !this.teamCanPlayFlag;
                this.serverResponse = "";
            }
        }
    }

    countNbPlayers() {
        const _this = this;
        // @ts-ignore
        this.listOfPlayers.forEach(function (player) {
            _this.nbBlanc = 0;
            _this.nbNoir = 0;
            console.log(player.team);
            if(player.team == 1){
                _this.nbNoir++;
            }else{
                _this.nbBlanc++;
            }
        })


    }

    isRoqueMove(x1 : number, y1 : number, x2 : number, y2 : number) : Boolean {
        if( ((this.board[x1][y1])[1] == 'n' && x1 == 0) || ((this.board[x1][y1])[1] == 'b' && x1 == 7) ){
            if((this.board[x1][y1])[0] == 'T'){
                return (this.board[x2][y2])[0] == 'R'
            }
            if((this.board[x1][y1])[0] == 'R'){
                return (this.board[x2][y2])[0] == 'T'
            }
        }
        return false;

    }

    quitGame(){
      //TODO: sortir le joueur de la bdd
        this.router.navigateByUrl('/').then(

        );
    }

    constructor(private router : Router, private chessService: ChessService) { }


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
        this.stompClientMove.connect({}, function(frame) {
            _this.stompClientMove.subscribe('/chat/getChosenMove/'+_this.playerDatas.id_game, function(message) {
                _this.movePieceOnBoard(_this.parseOutputMove(message.body));
                // data on refresh
                //_this.playerDatas = JSON.parse()
            });
        })



        this.stompClientPlayers.connect({}, function(frame) {
            _this.stompClientPlayers.subscribe('/chat/getGameInfo/'+_this.playerDatas.id_game, function(message) {
                console.log(message.body);
                _this.listOfPlayers = JSON.parse(message.body);
                console.log(_this.listOfPlayers);
                _this.countNbPlayers();
            });
            _this.stompClientPlayers.send('/message/connectToGame/'+_this.playerDatas.id_game, {}, "");
        })

    }

    ngOnDestroy() : void {
        // @ts-ignore
        //this.chosenMoveObservableRef.unsubscribe();
        this.stompClientMove.unsubscribe();
    }
}
