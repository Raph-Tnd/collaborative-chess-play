import {Component, Injectable, OnInit} from '@angular/core';
import {ChessService} from "../chessService";
import { userConnection,userPlayMove } from "../bodyModelHTTPRequest";

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
  colorTeam = "/assets/wamai.png";

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
      this.colorTeam = "/assets/kkk.png";
    }
    else{
      this.teamColor = 1;
      this.colorTeam = "/assets/wamai.png";
    }
  }


  //méthode qui implémente le comportement de la page lors de la création d'une partie
  onGameCreation(){
    let id;
    id = this.chessService.gameCreatePost();

    while(id == undefined){
      //TODO: partie non cree -> infi loop
      //Wait till request ended
    }

    let bodyConnect :  userConnection = {
      "name": this.userName,
      "id_game": id,
      "team": this.teamColor
    }
    this.chessService.connectGamePost(bodyConnect);

    /*this.chessService.gameCreatePost().subscribe(
      res => { console.log(res)},
      error => {console.log("Error")}
    );*/
  }


  //méthode qui implémente le comportement de la page lorsque l'on rejoint une partie
  onGameJoin(){
    console.log('On rejoint une partie de jeu');
  }



  constructor(private chessService : ChessService) {}

  ngOnInit(): void {

  }

}
