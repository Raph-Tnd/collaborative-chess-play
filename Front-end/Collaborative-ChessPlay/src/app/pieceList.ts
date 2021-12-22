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

// on se retrouve avec y en abscise et x en ordonne
export let initBOARD :string[][] = [
    ["Tn1","Cn1","Fn1","Dn","Rn","Fn2","Cn2","Tn2"],
    ["Pn1","Pn2","Pn3","Pn4","Pn5","Pn6","Pn7","Pn8"],
    ["X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X"],
    ["X","X","X","X","X","X","X","X"],
    ["Pb1","Pb2","Pb3","Pb4","Pb5","Pb6","Pb7","Pb8"],
    ["Tb1","Cb1","Fb1","Db","Rb","Fb2","Cb2","Tb2"]
]

function noPieceBetweenMove(x1: number, y1: number, x2: number, y2: number, BOARD: string[][]) {
    for (let i = 0; i < BOARD.length; i++){
        for (let j = 0; j < BOARD.length; j++){
            //verticale
            if (y1 == y2){
                if (j == y1 && (x1 < i || i < x2) ){
                    if (BOARD[i][j] != 'X'){
                        return false;
                    }
                }
            }
            //horizontale
            if (x1 == x2){
                if (i == x1 && (y1 < j || j < y2) ){
                    if (BOARD[i][j] != 'X'){
                        return false;
                    }
                }
            }
            //diagonale
            if(Math.abs(x1 - x2) == Math.abs(y1 - y2)){
                if (Math.abs(x1 - i) == Math.abs(y1 - j)){
                    if (BOARD[i][j] != 'X'){
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

export const PIECES: Piece[] = [
    {
        type: "T",
        asciiCodeWhite: "&#9814;",
        asciiCodeBlack: "&#9820;",
        verifyMove: (x1, y1, x2, y2, piece, BOARD: string[][]) => {
            //TODO: pour le roque aussi (voir roi)
            if(noPieceBetweenMove(x1,y1,x2,y2, BOARD)){
                //si pas de piece ou piece adverse entre les cases
                if(piece[1] == 'n' && ((x1 == 0 && y1 == 0) || (x1 == 0 && y1 == 7)) && x2 == 0 && y2 == 4 ){
                    //roque
                    return true;
                }
                if(piece[1] == 'b' && ((x1 == 7 && y1 == 0) || (x1 == 7 && y1 == 7)) && x2 == 7 && y2 == 4 ){
                    //roque
                    return true;
                }
                return (BOARD[x2][y2] == 'X' || (BOARD[x1][y1])[1] != (BOARD[x2][y2])[1]);
            }
            return false;
        }
    },

    {
        type: "C",
        asciiCodeWhite: "&#9816;",
        asciiCodeBlack: "&#9822;",
        verifyMove: (x1, y1, x2, y2, piece, BOARD: string[][]) => {
            if ( ((Math.abs(x1-x2) == 2) && (Math.abs(y1-y2) == 1))
            || ((Math.abs(x1-x2) == 1) && (Math.abs(y1-y2) == 2)) ){
                //si pas de piece ou piece adverse sur case arrive
                return (BOARD[x2][y2] == 'X' ||
                (BOARD[x1][y1])[1] != (BOARD[x2][y2])[1]);
            }
            return false;
        }
    },

    {
        type: "F",
        asciiCodeWhite:"&#9815;",
        asciiCodeBlack:"&#9821;",
        verifyMove : (x1,y1,x2,y2, piece, BOARD: string[][]) => {
            if(noPieceBetweenMove(x1,y1,x2,y2, BOARD)){
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
        type: "D",
        asciiCodeWhite:"&#9813;",
        asciiCodeBlack:"&#9819;",
        verifyMove : (x1,y1,x2,y2, piece, BOARD: string[][]) => {
            if(noPieceBetweenMove(x1,y1,x2,y2, BOARD)){
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
        type: "R",
        asciiCodeWhite:"&#9812;",
        asciiCodeBlack:"&#9818;",
        verifyMove : (x1,y1,x2,y2, piece, BOARD: string[][]) => {
            //TODO: forcer a jouer le roi/ ne pas deplacer une piece si possible echec
            //TODO: pour le roque aussi
            if ((Math.abs(y1-y2) == 1) || (Math.abs(x1 - x2) == 1)){
                //si pas de piece ou piece adverse sur case arrive
                return (BOARD[x2][y2] == 'X' ||
                (BOARD[x1][y1])[1] != (BOARD[x2][y2])[1]);
            }
            if(noPieceBetweenMove(x1,y1,x2,y2, BOARD)){
                //si pas de piece ou piece adverse entre les cases
                if(piece[1] == 'n' && x1 == 0 && y1 == 4 && ((x2 == 0 && y2 == 0) || (x2 == 0 && y2 == 7)) ){
                    //roque
                    return true;
                }
                if(piece[1] == 'b' && x1 == 7 && y1 == 4 && ((x2 == 7 && y2 == 0) || (x2 == 7 && y2 == 7)) ){
                    //roque
                    return true;
                }
            }
            return false;
        }
    },

    {
        type: "P",
        asciiCodeWhite:"&#9817;",
        asciiCodeBlack:"&#9823;",
        verifyMove : (x1,y1,x2,y2, piece, BOARD: string[][]) => {
            //TODO: prise en passant

            //deplacement vertical
            if(y1 == y2){
                if(piece[1] == 'n') {
                    if((x2 == x1 + 1) || (x2 == x1 + 2 && x1 == 1)){
                        return (BOARD[x2][y2] == 'X' ||
                            (BOARD[x1][y1])[1] != (BOARD[x2][y2])[1]);
                    }
                }
                if(piece[1] == 'b') {
                    if((x2 == x1 - 1) || (x2 == x1 - 2 && x1 == 6)){
                        return (BOARD[x2][y2] == 'X' ||
                            (BOARD[x1][y1])[1] != (BOARD[x2][y2])[1]);
                    }
                }
            }
            //prise diagonale
            if(Math.abs(y1-y2) == 1){
                if(piece[1] == 'n') {
                    return (x2 == x1 + 1 && BOARD[x2][y2] != 'X' && (BOARD[x1][y1])[1] != (BOARD[x2][y2])[1]);
                }
                if(piece[1] == 'b') {
                    return (x2 == x1 - 1 && BOARD[x2][y2] != 'X' && (BOARD[x1][y1])[1] != (BOARD[x2][y2])[1]);
                }
            }
            return false;
        }
    }


];
