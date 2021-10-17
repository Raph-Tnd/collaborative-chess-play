import {Piece} from "./app.component";


export function givePiece(name : string){
  switch (name){
    case "T":
      return PIECES[0];

    case "C":
      return PIECES[1];

    case "F":
      return PIECES[2];

    case "D":
      return PIECES[3];

    case "R":
      return PIECES[4];

    case "P":
      return PIECES[5];

  }
  return ;
}

export let BOARD :string[][] = [
  ["Tn1","Cn1","Fn1","Dn","Rn","Fn2","Cn2","Tn2"],
  ["Pn1","Pn2","Pn3","Pn4","Pn5","Pn6","Pn7","Pn8"],
  ["X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X"],
  ["Pb1","Pb2","Pb3","Pb4","Pb5","Pb6","Pb7","Pb8"],
  ["Tb1","Cb1","Fb1","Db","Rb","Fb2","Cb2","Tb2"]
]

function pieceBetweenMove(x1: number, y1: number, x2: number, y2: number) {
  for (let i = 0; i < BOARD.length; i++){
    for (let j = 0; j < BOARD.length; j++){
      //verticale
      if (y1 == y2){
        if (i > x1 || i < x2){
          if (BOARD[i][j] != 'X'){
            return true;
          }
        }
      }
      //horizontale
      if (x1 == x2){
        if (i > y1 || i < y2){
          if (BOARD[i][j] != 'X'){
            return true;
          }
        }
      }
      //diagonale
      if(Math.abs(x1 - x2) == Math.abs(y1 - y2)){
        if (BOARD[i][j] != 'X'){
          return true;
        }
      }
    }
  }
  return false;
}

export const PIECES: Piece[] = [
  {
    type: "T",
    asciiCodeWhite: "&#9814;",
    asciiCodeBlack: "&#9820;",
    verifyMove: (x1, y1, x2, y2) => {
      //TODO: Roque
      if(!pieceBetweenMove(x1,y1,x2,y2)){
        if (BOARD[x2][y2] != 'X' ||
          (BOARD[x1][y1])[1] != (BOARD[x2][y2])[1]){
          //si pas de piece ou piece adverse sur case arrive
          return true;
        }
      }
      return false;
    }
  },

  {
    type: "C",
    asciiCodeWhite: "&#9816;",
    asciiCodeBlack: "&#9822;",
    verifyMove: (x1, y1, x2, y2) => {
      if ( ((x2 == x1 + 2 || x1 - 2) && (y1 == y2 + 1 || y2 - 1))
      || ((x2 == x1 + 1 || x1 - 1) && (y1 == y2 + 2 || y2 - 2)) ){
        if (BOARD[x2][y2] == 'X' ||
          (BOARD[x1][y1])[1] != (BOARD[x2][y2])[1]){
          //si pas de piece ou piece adverse sur case arrive
          return true;
        }
      }
      return false;
    }
  },

  {
    type: "F",
    asciiCodeWhite:"&#9815;",
    asciiCodeBlack:"&#9821;",
    verifyMove : (x1,y1,x2,y2) => {
      if(!pieceBetweenMove(x1,y1,x2,y2)){
        if (BOARD[x2][y2] != 'X' ||
          (BOARD[x1][y1])[1] != (BOARD[x2][y2])[1]){
          //si pas de piece ou piece adverse sur case arrive
          return true;
        }
      }
      return false;
    }
  },

  {
    type: "D",
    asciiCodeWhite:"&#9813;",
    asciiCodeBlack:"&#9819;",
    verifyMove : (x1,y1,x2,y2) => {
      if(!pieceBetweenMove(x1,y1,x2,y2)){
        if (BOARD[x2][y2] != 'X' ||
          (BOARD[x1][y1])[1] != (BOARD[x2][y2])[1]){
          //si pas de piece ou piece adverse sur case arrive
          return true;
        }
      }
      return false;
    }
  },

  {
    type: "R",
    asciiCodeWhite:"&#9812;",
    asciiCodeBlack:"&#9818;",
    verifyMove : (x1,y1,x2,y2) => {
      //TODO: forcer a jouer le roi/ ne pas deplacer une piece si possible echec
      if (BOARD[x2][y2] != 'X' ||
        (BOARD[x1][y1])[1] != (BOARD[x2][y2])[1]){
        //si pas de piece ou piece adverse sur case arrive
        return true;
      }
      return false;
    }
  },

  {
    type: "P",
    asciiCodeWhite:"&#9817;",
    asciiCodeBlack:"&#9823;",
    verifyMove : (x1,y1,x2,y2) => {
      //TODO: prise en passant
      if (y1 == y2){
        //deplacement vertical
        if(x1 == 2 || 7){
          //TODO : a finir
          return true;
        }
      }
      return true;
    }
  }


];
