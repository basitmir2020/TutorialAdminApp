import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {ResponseModel} from "../../../../../../../shared/models/response.model";
import {ExamSubjects} from "../model/exam-subjects.model";

@Injectable({
  providedIn: 'root'
})
export class ExamSubjectsHttpService {

  private readonly _apiURL:string;

  constructor(private _http:HttpClient) {
    this._apiURL = environment.API_URL;
  }

  saveExamSubjects(body:ExamSubjects){
    let url = `${this._apiURL}ExamSubjects/SaveExamSubjects`;
    return this._http.post<ResponseModel>(url,body);
  }
}
