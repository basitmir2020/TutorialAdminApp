import { Injectable } from '@angular/core';
import {ManageExamSubjectHttpService} from "./manage-exam-subject-http.service";
import {DeleteExamSubjects, examSubjectStatus} from "../model/all-exam-subjects.model";

@Injectable({
  providedIn: 'root'
})
export class ManageExamSubjectService {

  constructor(private _manageExamSubjectHttpService:ManageExamSubjectHttpService) { }

  GetAllSubjects(filter?: string, orderBy?: string, pageNumber: number = 1, pageSize: number = 10){
    return this._manageExamSubjectHttpService.GetAllSubjects(filter,orderBy,pageNumber,pageSize);
  }

  DeleteExamSubjectById(body:DeleteExamSubjects){
    return this._manageExamSubjectHttpService.DeleteExamTypeById(body);
  }

  ChangeExamSubjectStatus(body:examSubjectStatus){
    return this._manageExamSubjectHttpService.ChangeExamTypeStatus(body);
  }

}
