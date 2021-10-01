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


  ngOnInit(): void {
  }

}
