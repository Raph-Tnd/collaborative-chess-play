import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {userConnection, userPlayMove} from "./bodyModelHTTPRequest";
import {environment} from "../environments/environment";


@Injectable({providedIn: "root"})
export class ChessService{


  baseUrl = environment.API_URL+"/api"
  public defaultHeaders = new HttpHeaders();

  gameCreatePost(){
    let headers = this.defaultHeaders;
    return this.http.post(this.baseUrl+"/game/create",
      null,
      {
        headers : headers,
        responseType : "text"
      })
  }

  connectGamePost(body : userConnection){
    let headers = this.defaultHeaders;
    return this.http.post(this.baseUrl+"/user/connect",
      body,
      {
        headers : headers,
        responseType : "text"
      })
  }

  voteMovePost(body: userPlayMove){
    let headers = this.defaultHeaders;
    return this.http.post(this.baseUrl+"/game/vote",
      body,
      {
        headers : headers,
        responseType : "text"
      })
  }

  fetchChosenMoveGet(id_game : string){
    // let headers = this.defaultHeaders;
    return this.http.get(this.baseUrl+"/game/getChosenMove/"+ id_game);
  }


  constructor(private http: HttpClient) {
  }
}
