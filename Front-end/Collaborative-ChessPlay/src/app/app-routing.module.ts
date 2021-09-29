import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CcpCadreCentralPpComponent } from './ccp-cadre-central-pp/ccp-cadre-central-pp.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';

const routes: Routes = [
  { path : 'play', component: ChessBoardComponent}, //a changer pour contenir l'ID de la partie ":id"
  { path : '**', component: CcpCadreCentralPpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
