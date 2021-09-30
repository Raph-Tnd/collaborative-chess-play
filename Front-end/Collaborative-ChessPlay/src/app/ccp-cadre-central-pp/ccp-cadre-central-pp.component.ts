import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ccp-cadre-central-pp',
  templateUrl: './ccp-cadre-central-pp.component.html',
  styleUrls: ['./ccp-cadre-central-pp.component.scss']
})
export class CcpCadreCentralPpComponent implements OnInit {
  
  //Titre de la page
  title = 'Collaborative-ChessPlay';

  //Nom utilisateur qui sera rempli par l'utilisateur
   userName='';

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

  constructor() { }

  //méthode qui implémente le comportement de la page lors de la création d'une partie 
  onGameCreation(){
    console.log('On crée une partie de jeu');
  }

  //méthode qui implémente le comportement de la page lorsque l'on rejoint une partie 
  onGameJoin(){
    console.log('On rejoint une partie de jeu');
  }

  ngOnInit(): void {
    
  }

}
