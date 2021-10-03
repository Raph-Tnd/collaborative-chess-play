import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Collaborative-ChessPlay';
}

export interface Piece{
  type: string;
  asciiCodeWhite: string;
  asciiCodeBlack: string;
  //coordonnes: 0 < x/y < 7 deja verifie
  verifyMove: (x1 : number, y1 : number, x2 : number, y2 : number) => boolean;
}
