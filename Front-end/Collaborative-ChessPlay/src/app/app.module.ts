import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CcpCadreCentralPpComponent } from './ccp-cadre-central-pp/ccp-cadre-central-pp.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { PieceComponent } from './piece/piece.component';
import { MatInputModule } from "@angular/material/input";
import {  MatFormFieldModule} from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CcpCadreCentralPpComponent,
    ChessBoardComponent,
    PieceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
