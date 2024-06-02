import { Injectable } from '@angular/core';
import {ManageSubjectChaptersHttpService} from "./manage-subject-chapters-http.service";
import {DeleteSubjectChapters, SubjectChapterStatus} from "../model/manage-subject-chapters.model";


@Injectable({
  providedIn: 'root'
})
export class ManageSubjectChaptersService {

  constructor(private _manageSubjectChaptersHttpService:ManageSubjectChaptersHttpService) { }

  GetAllSubjectChapters(filter?: string, orderBy?: string, pageNumber: number = 1, pageSize: number = 10){
    return this._manageSubjectChaptersHttpService.GetAllSubjectChapters(filter,orderBy,pageNumber,pageSize);
  }

  DeleteSubjectChaptersById(body:DeleteSubjectChapters){
    return this._manageSubjectChaptersHttpService.DeleteSubjectChaptersById(body);
  }

  ChangeSubjectChaptersStatus(body:SubjectChapterStatus){
    return this._manageSubjectChaptersHttpService.ChangeSubjectChaptersStatus(body);
  }
}
