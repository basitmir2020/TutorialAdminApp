import { Injectable } from '@angular/core';
import {ManageExamHttpTypeService} from "./manage-exam-http-type.service";
import {ChangeStatus, DeleteExamType} from "../model/all-exam-type.model";
import {ResponseModel} from "../../../../../../../shared/models/response.model";

@Injectable({
  providedIn: 'root'
})
export class ManageExamTypeService {

  constructor(private _examHttpService:ManageExamHttpTypeService) { }

  GetAllExamTypes(filter?: string, orderBy?: string, pageNumber: number = 1, pageSize: number = 10){
    return this._examHttpService.GetAllExamTypes(filter,orderBy,pageNumber,pageSize);
  }

  DeleteExamTypeById(body:DeleteExamType){
    return this._examHttpService.DeleteExamTypeById(body);
  }

  ChangeExamTypeStatus(body:ChangeStatus){
    return this._examHttpService.ChangeExamTypeStatus(body);
  }
}
