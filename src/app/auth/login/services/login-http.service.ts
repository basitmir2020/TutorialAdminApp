import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {LoginModel, TokenResponseViewModel} from "../models/auth.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {

  private readonly _apiURL:string;

  constructor(private _http:HttpClient) {
    this._apiURL = environment.API_URL;
  }

  loginHttpUser(body:LoginModel):Observable<TokenResponseViewModel>{
    let url = `${this._apiURL}Authentication/LoginUser`;
    const headers= new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post<TokenResponseViewModel>(url,body,{headers:headers});
  }
}
