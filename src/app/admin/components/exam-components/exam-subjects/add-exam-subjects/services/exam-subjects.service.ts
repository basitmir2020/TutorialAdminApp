import { Injectable } from '@angular/core';
import {ExamSubjectsHttpService} from "./exam-subjects-http.service";
import {ExamSubjects} from "../model/exam-subjects.model";
import {ResponseModel} from "../../../../../../../shared/models/response.model";

@Injectable({
  providedIn: 'root'
})
export class ExamSubjectsService {

  constructor(
    private examSubjectsHttpService: ExamSubjectsHttpService
  ) { }

  saveExamSubjects(body:ExamSubjects){
    return this.examSubjectsHttpService.saveExamSubjects(body);
  }
}
