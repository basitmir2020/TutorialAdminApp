import { Injectable } from '@angular/core';
import {ExamTypeHttpService} from "./exam-type-http.service";
import {ExamTypeDto} from "../model/exam-type.model";

@Injectable({
  providedIn: 'root'
})
export class ExamTypeService {

  constructor(
    private examTypeHttpService: ExamTypeHttpService
  ) { }


  saveExamType(body:ExamTypeDto){
    return this.examTypeHttpService.saveExamType(body);
  }
}
