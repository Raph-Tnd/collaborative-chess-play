import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {ChessService} from "../chessService";
import { userConnection,userPlayMove } from "../bodyModelHTTPRequest";
import {Router, UrlTree} from "@angular/router";

@Component({
  selector: 'app-ccp-cadre-central-pp',
  templateUrl: './ccp-cadre-central-pp.component.html',
  styleUrls: ['./ccp-cadre-central-pp.component.scss']
})

@Injectable({providedIn: "root"})
export class CcpCadreCentralPpComponent implements OnInit {

  //Titre de la page
  title = 'Collaborative-ChessPlay';

  //Nom utilisateur qui sera rempli par l'utilisateur
  userName='';

  //id de la game que veut rejoindre un joueur
  gameId='';

  //booléen d'affichage de la zone d'id pour join la game
  showGameIdInputZone=false;

  //Numero de la team ( 0 = blanc, 1 = noir)
  teamColor= 1;

  //image src
  colorTeam = String.fromCharCode(9818);

  //méthode pour changer le statut de showGameIdInputZone en true
  affichageGameIdInputZone(){
    this.showGameIdInputZone=true;
  }

  //vérification de l'intégrité du nom d'utilisateur:
  //(DONE)-plus de 3 lettres
  enoughUserNameLetters(Name :string){
    return Name.length>=4
  }
  //(TODO)-pas déjà présent dans la partie
  //(TODO)-pas que des caractères vides

  verifUserName(Name : string){
    return this.enoughUserNameLetters(Name);
  }

  changeColor(){
    //on change d'abord la couleur puis on applique l'image
    //donc si 1 = noir -> 0 donc image blanche
    if (this.teamColor == 1){
      this.teamColor = 0;
      this.colorTeam = String.fromCharCode(9812);
    }
    else{
      this.teamColor = 1;
      this.colorTeam = String.fromCharCode(9818);
    }
  }

  //méthode qui implémente le comportement de la page lors de la création d'une partie
  onGameCreation(){
    this.chessService.gameCreatePost().subscribe(
      (res) => {
        let bodyConnect: userConnection = {
          "name": this.userName,
          "id_game": res,
          "team": this.teamColor
        }
        this.chessService.connectGamePost(bodyConnect).subscribe(
          (next) => {
            this.router.navigateByUrl(('/play/'+res),{state: {data : bodyConnect}});
            console.log("Connection a : " + res + " en tant que " + bodyConnect.name)
          },
          error => {console.log(error)}
        );

      },
      error => {console.log("Partie non créée, veuillez réessayer")}
    );
  }


  //méthode qui implémente le comportement de la page lorsque l'on rejoint une partie
  onGameJoin(){
    console.log('On rejoint une partie de jeu');
  }



  constructor(private chessService : ChessService, private router : Router) {}

  ngOnInit(): void {

  }

}
