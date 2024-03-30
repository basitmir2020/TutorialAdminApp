import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {ResponseViewModelGeneric} from "../../../../../../../shared/models/response.generic.model";
import {ChangeStatus, DeleteExamType, GetAllExamTypes} from "../model/all-exam-type.model";
import {ResponseModel} from "../../../../../../../shared/models/response.model";

@Injectable({
  providedIn: 'root'
})
export class ManageExamHttpTypeService {
  private readonly _apiURL:string;

  constructor(private _http:HttpClient) {
    this._apiURL = environment.API_URL;
  }

  GetAllExamTypes(filter?: string, orderBy?: string, pageNumber: number = 1, pageSize: number = 10){
    let url = `${this._apiURL}Exam/GetExamTypes`;
    let params = new HttpParams()
      .set('filter', filter || '')
      .set('orderBy', orderBy || '')
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this._http.get<ResponseViewModelGeneric<GetAllExamTypes[]>>(url,{params});
  }

  DeleteExamTypeById(body:DeleteExamType){
    let url = `${this._apiURL}Exam/DeleteExamType`;
    return this._http.delete<ResponseModel>(url,{body});
  }

  ChangeExamTypeStatus(body:ChangeStatus){
    let url = `${this._apiURL}Exam/ChangeStatusExamType`;
    return this._http.put<ResponseModel>(url,body);
  }
}
