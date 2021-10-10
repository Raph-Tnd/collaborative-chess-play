import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ChessService} from "../chessService";
import {userConnection, userPlayMove} from "../bodyModelHTTPRequest";
import {BOARD, givePiece} from "../pieceList";
import {Subscription, timer} from "rxjs";
import {switchMap} from "rxjs/operators";

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

  //timerSubscription : Subscription;
  playerDatas = <userConnection>{};

  constructor(private activatedRoute: ActivatedRoute, private chessService: ChessService) { }

  ngOnInit(): void {
    //keep data on reload
    if(history.state.data){
      this.playerDatas = history.state.data;
      sessionStorage.setItem('player_Datas', JSON.stringify(this.playerDatas));
    }else{
      this.playerDatas = JSON.parse(<string>sessionStorage.getItem('player_Datas'));
    }

    //TODO: fetch data from backend
    //subscribe to moveResponse every X second
    /*this.timerSubscription = timer(0,30000).pipe(
      switchMap(() => {

      })
    );*/
  }

  ngOnDestroy() : void {
    //this.timerSubscription.unsubscribe();
  }

  @Input()
  moveField : string = "";

  board  = BOARD;
  serverResponse : string = "";

  isEven(n: number) {
    return n % 2 == 0;
  }

  colorBoard(x: number, y: number){
    if (this.isEven(x)){
      if(this.isEven(y)){
        return "brown";
      }
      else{
        return "beige";
      }
    }
    else{
      if(this.isEven(y)){
        return "beige";
      }
      else{
        return "brown";
      }
    }
  }


  moveFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern("^[a-hA-H][0-8][a-hA-H][0-8]$")
  ])

  matcher = new MyErrorStateMatcher();

  parseMove(move : string){
    //from "C1H2" -> "3182"
    return String(move.toUpperCase().charCodeAt(0)-64)+move[1]+String(move.toUpperCase().charCodeAt(2)-64)+move[3];

  }

  validateMove(move: string){
    let pieceBoard = BOARD[Number(move[0])-1][Number(move[1])-1];
    let piece = givePiece(pieceBoard[0]);
    if(piece?.type == undefined){
      return false;
    }
    else{
      return piece?.verifyMove(parseInt(move[0])-1,
        parseInt(move[1])-1,
        parseInt(move[2])-1,
        parseInt(move[3])-1
      );
    }
  }

  fetchMove(){

  }

  onSubmit(){
    if (this.moveFormControl.valid) {
      //parseMove and check if move is valid
      let move = this.parseMove(this.moveFormControl.value);
      if (this.validateMove(move)) {
        let bodyMove : userPlayMove = {
          "player": this.playerDatas.name,
          "game_id": this.playerDatas.id_game,
          "x1Coord": parseInt(move[0]),
          "y1Coord": parseInt(move[1]),
          "x2Coord": parseInt(move[2]),
          "y2Coord": parseInt(move[3])
        }
        this.chessService.voteMovePost(bodyMove).subscribe(
          res => {this.serverResponse = "Vote fait";},
          error => {console.log(error)}
        )
      } else {
        //TODO: Move invalid dans le moveFormControl
        //this.moveFormControl['pattern'].setErrors({'incorrect': true});
        console.log("Move invalid");
      }

      this.moveFormControl.reset();
    }
  }
}