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
export const PIECES: Piece[] = [
  {
    type: "T",
    asciiCodeWhite: "&#9814;",
    asciiCodeBlack: "&#9820;",
    verifyMove: (x1, y1, x2, y2) => {
      return true;
    }
  },

  {
    type: "C",
    asciiCodeWhite: "&#9816;",
    asciiCodeBlack: "&#9822;",
    verifyMove: (x1, y1, x2, y2) => {
      return true;
    }
  },

  {
    type: "F",
    asciiCodeWhite:"&#9815;",
    asciiCodeBlack:"&#9821;",
    verifyMove : (x1,y1,x2,y2) => {
      return true;
    }
  },

  {
    type: "D",
    asciiCodeWhite:"&#9813;",
    asciiCodeBlack:"&#9819;",
    verifyMove : (x1,y1,x2,y2) => {
      return true;
    }
  },

  {
    type: "R",
    asciiCodeWhite:"&#9812;",
    asciiCodeBlack:"&#9818;",
    verifyMove : (x1,y1,x2,y2) => {
      return true;
    }
  },

  {
    type: "P",
    asciiCodeWhite:"&#9817;",
    asciiCodeBlack:"&#9823;",
    verifyMove : (x1,y1,x2,y2) => {
      return true;
    }
  }


];
