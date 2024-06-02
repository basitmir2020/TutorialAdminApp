import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {ResponseViewModelGeneric} from "../../../../../../../shared/models/response.generic.model";
import {ResponseModel} from "../../../../../../../shared/models/response.model";
import {
  DeleteSubjectChapters,
  GetAllSubjectChapters,
  SubjectChapterStatus
} from "../model/manage-subject-chapters.model";

@Injectable({
  providedIn: 'root'
})
export class ManageSubjectChaptersHttpService {

  private readonly _apiURL:string;

  constructor(private _http:HttpClient) {
    this._apiURL = environment.API_URL;
  }

  GetAllSubjectChapters(filter?: string, orderBy?: string, pageNumber: number = 1, pageSize: number = 10){
    let url = `${this._apiURL}SubjectChapter/GetSubjectChapters`;
    let params = new HttpParams()
      .set('filter', filter || '')
      .set('orderBy', orderBy || '')
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this._http.get<ResponseViewModelGeneric<GetAllSubjectChapters[]>>(url,{params});
  }

  DeleteSubjectChaptersById(body:DeleteSubjectChapters){
    let url = `${this._apiURL}SubjectChapter/DeleteSubjectChapters`;
    return this._http.delete<ResponseModel>(url,{body});
  }

  ChangeSubjectChaptersStatus(body:SubjectChapterStatus){
    let url = `${this._apiURL}SubjectChapter/ChangeSubjectChaptersStatus`;
    return this._http.put<ResponseModel>(url,body);
  }
}
