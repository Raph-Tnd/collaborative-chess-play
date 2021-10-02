import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {userConnection} from "./bodyModelHTTPRequest";

@Injectable({providedIn: "root"})
export class ChessService{
  baseUrl = "http://localhost:8080/api"
  public defaultHeaders = new HttpHeaders();

  gameCreatePost(){
    let headers = this.defaultHeaders;
    this.http.post(this.baseUrl+"/game/create",
      null,
      {
        headers : headers,
        responseType : "text"
      }).subscribe(
      res => {return res},
      error => {console.log(error)}
    )
  }

  connectGamePost(body : userConnection){
    let headers = this.defaultHeaders;
    this.http.post(this.baseUrl+"/user/connect",
      body,
      {
        headers : headers,
        responseType : "text"
      }).subscribe(
      res => {console.log("Connecte a : " + body.id_game)},
      error => {console.log(error)}
    )
  }

  constructor(private http: HttpClient) {
  }
}
