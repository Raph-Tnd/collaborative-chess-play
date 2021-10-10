import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {MoveModel} from "../Models/MoveModel";
import {UserModel} from "../Models/UserModel";


@Injectable({providedIn: "root"})
export class ChessService{
  baseUrl = "http://localhost:8080/api/game"
  public defaultHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
  }

  gameCreatePost(){
    let headers = this.defaultHeaders;
    return this.http.post(this.baseUrl+"/create",
      null,
      {
        headers : headers,
        responseType : "text"
      })
  }

  voteMovePost(body: MoveModel){
    let headers = this.defaultHeaders;
    return this.http.post(this.baseUrl+"/vote",
      body,
      {
        headers : headers,
        responseType : "text"
      })
  }

  //TODO: fetch data from backend
  fetchMoveGet(){
    let headers = this.defaultHeaders;
    return this.http.get(this.baseUrl);
  }
}
