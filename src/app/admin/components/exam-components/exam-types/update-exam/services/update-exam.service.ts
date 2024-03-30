import { Injectable } from '@angular/core';
import {UpdateExamHttpService} from "./update-exam-http.service";
import {GetExamType} from "../model/update-exam.model";

@Injectable({
  providedIn: 'root'
})
export class UpdateExamService {
  constructor(private _examHttpService:UpdateExamHttpService) { }

  getExamTypeById(id:number){
    return this._examHttpService.getExamTypeById(id);
  }

  updateExamType(body:GetExamType){
    return this._examHttpService.updateExamType(body);
  }
}
