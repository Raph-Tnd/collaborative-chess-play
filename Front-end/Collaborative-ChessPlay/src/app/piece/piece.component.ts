import {Component, Input, OnInit} from '@angular/core';
import {givePiece, PIECES} from "../pieceList";

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {


  pieces = PIECES;

  @Input()
  pieceBoard : string = "";

  displayPiece(piece : string){
    let pieceType = piece[0];
    let pieceColor = piece[1];
    let res = givePiece(pieceType);
    if(pieceType == "X"){
      return "&nbsp;";
    }
    if(pieceColor == "b"){
      // @ts-ignore
      return res.asciiCodeWhite;
    }
    else{
      // @ts-ignore
      return res.asciiCodeBlack;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
