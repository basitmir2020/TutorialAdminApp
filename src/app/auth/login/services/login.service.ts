import { Injectable } from '@angular/core';
import {LoginModel} from "../models/auth.model";
import {LoginHttpService} from "./login-http.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _loginHttp:LoginHttpService) {

  }

  loginUser(body:LoginModel){
    return this._loginHttp.loginHttpUser(body);
  }
}
