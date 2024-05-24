import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {ExamTypeDto} from "../model/exam-type.model";
import {ResponseModel} from "../../../../../../../shared/models/response.model";

@Injectable({
  providedIn: 'root'
})
export class ExamTypeHttpService {

  private readonly _apiURL:string;

  constructor(private _http:HttpClient) {
    this._apiURL = environment.API_URL;
  }

  saveExamType(body:ExamTypeDto){
    let url = `${this._apiURL}Exam/SaveExamTypes`;
    return this._http.post<ResponseModel>(url,body);
  }
}
