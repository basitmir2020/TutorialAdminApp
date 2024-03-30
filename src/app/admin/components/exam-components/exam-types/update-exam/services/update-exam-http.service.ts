import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {ResponseModel} from "../../../../../../../shared/models/response.model";
import {Observable} from "rxjs";
import {ResponseViewModelGeneric} from "../../../../../../../shared/models/response.generic.model";
import {GetExamType} from "../model/update-exam.model";

@Injectable({
  providedIn: 'root'
})
export class UpdateExamHttpService {

  private readonly _apiURL:string;

  constructor(private _http:HttpClient) {
    this._apiURL = environment.API_URL;
  }

  getExamTypeById(id:number):Observable<ResponseViewModelGeneric<GetExamType>>{
    let url = `${this._apiURL}Exam/GetExamTypeById/${id}`;
    return this._http.get<ResponseViewModelGeneric<GetExamType>>(url);
  }

  updateExamType(body:GetExamType){
    let url = `${this._apiURL}Exam/UpdateExamType`;
    return this._http.put<ResponseModel>(url,body);
  }
}
