import { Injectable } from '@angular/core';
import {SubjectChaptersDto} from "../model/add-subject-chapters.model";
import {ResponseModel} from "../../../../../../../shared/models/response.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddSubjectChaptersHttpService {

  private readonly _apiURL:string;

  constructor(private _http:HttpClient) {
    this._apiURL = environment.API_URL;
  }

  saveSubjectChapters(body:SubjectChaptersDto){
    let url = `${this._apiURL}SubjectChapter/SaveSubjectChapters`;
    return this._http.post<ResponseModel>(url,body);
  }
}
