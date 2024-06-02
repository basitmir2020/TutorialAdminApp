import { Injectable } from '@angular/core';
import {AddSubjectChaptersHttpService} from "./add-subject-chapters-http.service";
import {SubjectChaptersDto} from "../model/add-subject-chapters.model";

@Injectable({
  providedIn: 'root'
})
export class AddSubjectChaptersService {

  constructor(
    private addSubjectChaptersHttpService: AddSubjectChaptersHttpService
  ) { }


  saveSubjectChapters(body:SubjectChaptersDto){
    return this.addSubjectChaptersHttpService.saveSubjectChapters(body);
  }
}
