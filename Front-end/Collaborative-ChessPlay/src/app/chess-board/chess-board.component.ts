import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss']
})
export class ChessBoardComponent implements OnInit {

  constructor() { }
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


  displayBoard() {
    let returnDiv = "";
    let color = true;
    console.log("test");
    for (let i = 0; i < 8; i++){
      for (let j = 0; j < 8; j++){
        console.log("test");
        let pieceTemp = this.BOARD[i][j];

        if(color){
          returnDiv += "<div class=\"beige\">"+this.matchPieceAscii(pieceTemp)+"</div>\n"
        }
        else{
          returnDiv += "<div class=\"brown\">"+this.matchPieceAscii(pieceTemp)+"</div>\n"
        }
        color = !color;
      }
    }
    console.log(returnDiv)
    return returnDiv;
  }

  matchPieceAscii( pieceTemp: string){
    switch (pieceTemp) {
      //regex: P en premiere lettre puis une lettre parmi n ou b et un chiffre 1 à 8
      case "/^Pb[1-8]$":
        return "&#9817;";
        break;

      case "/^Pn[1-8]$":
        return "&#9821;";
        break;

      case "/^Tb[12]$":
        return "&#x2656;";

      case "/^Tn[12]$":
        return "&#9820;";

      case "/^Cb[12]":
        return "&#9816;";

      case "/^Cn[12]":
        return "&#9822;";

      case "/^Fb[12]":
        return "&#9815;";

      case "/^Fn[12]":
        return "&#9821;";

      case "/^D[bn]":
        if (pieceTemp[1] == "b") {
          return "&#9813;";
        }
        if (pieceTemp[1] == "n") {
          return "&#9819;";
        }
        break;

      case "/^R[bn]":
        if (pieceTemp[1] == "b") {
          return "&#9812;";
        }
        if (pieceTemp[1] == "n") {
          return "&#9818;";
        }
        break;
    }
    return "";
}

  ngOnInit(): void {
  }

}
