import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {ActivatedRoute} from "@angular/router";
import {ChessService} from "../chessService";
import {userConnection} from "../bodyModelHTTPRequest";

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



  @Input()
  moveField : string = "";
  idGame : string | null  = "";

  BOARD: string[][] = [
    ["Tn1","Cn1","Fn1","Dn","Rn","Fn2","Cn2","Tn2"],
    ["Pn1","Pn2","Pn3","Pn4","Pn5","Pn6","Pn7","Pn8"],
    ["X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X"],
    ["Pb1","Pb2","Pb3","Pb4","Pb5","Pb6","Pb7","Pb8"],
    ["Tb1","Cb1","Fb1","Db","Rb","Fb2","Cb2","Tb2"]
  ]
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
    return String(move.charCodeAt(0)-97)+move[1]+String(move.charCodeAt(2)-97)+move[3];

  }

  onSubmit(){
    this.moveFormControl.markAllAsTouched();
    if (this.moveFormControl.valid){
      //submit to back
      let move = this.parseMove(this.moveFormControl.value);


      this.moveFormControl.reset();
    }
  }

  constructor(private route: ActivatedRoute, private chessService: ChessService) { }

  ngOnInit(): void {


  }

}
