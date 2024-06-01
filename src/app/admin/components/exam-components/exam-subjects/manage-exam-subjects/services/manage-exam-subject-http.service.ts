import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {ResponseViewModelGeneric} from "../../../../../../../shared/models/response.generic.model";
import {DeleteExamSubjects, examSubjectStatus, GetAllExamSubjects} from "../model/all-exam-subjects.model";
import {ResponseModel} from "../../../../../../../shared/models/response.model";

@Injectable({
  providedIn: 'root'
})
export class ManageExamSubjectHttpService {

  private readonly _apiURL:string;

  constructor(private _http:HttpClient) {
    this._apiURL = environment.API_URL;
  }

  GetAllSubjects(filter?: string, orderBy?: string, pageNumber: number = 1, pageSize: number = 10){
    let url = `${this._apiURL}ExamSubjects/GetExamSubjects`;
    let params = new HttpParams()
      .set('filter', filter || '')
      .set('orderBy', orderBy || '')
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this._http.get<ResponseViewModelGeneric<GetAllExamSubjects[]>>(url,{params});
  }

  DeleteExamTypeById(body:DeleteExamSubjects){
    let url = `${this._apiURL}ExamSubjects/DeleteExamSubjects`;
    return this._http.delete<ResponseModel>(url,{body});
  }

  ChangeExamTypeStatus(body:examSubjectStatus){
    let url = `${this._apiURL}ExamSubjects/ChangeExamSubjectsStatus`;
    return this._http.put<ResponseModel>(url,body);
  }
}
