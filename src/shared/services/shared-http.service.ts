import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {CountryDto, UserDto} from "../models/common.model";
import {ResponseViewModelGeneric} from "../models/response.generic.model";

@Injectable({
  providedIn: 'root'
})
export class SharedHttpService {
  private dataCache$: BehaviorSubject<ResponseViewModelGeneric<UserDto>> = new BehaviorSubject<ResponseViewModelGeneric<UserDto>>(null);
  private countryCached$: BehaviorSubject<ResponseViewModelGeneric<CountryDto[]>> = new BehaviorSubject<ResponseViewModelGeneric<CountryDto[]>>(null);
  private readonly _apiURL:string;

  constructor(private _http:HttpClient) {
    this._apiURL = environment.API_URL;
  }

  loggedUser():Observable<ResponseViewModelGeneric<UserDto>>{
    const cachedData = this.dataCache$.getValue();
    if (cachedData) {
      return this.dataCache$.asObservable();
    }else {
      let url = `${this._apiURL}Lookup/GetLoggedUser`;
      const headers= new HttpHeaders({'Content-Type':'application/json'});
      return this._http.get<ResponseViewModelGeneric<UserDto>>(url,{headers:headers}).pipe(
        tap(data =>{
          this.dataCache$.next(data);
        })
      );
    }
  }

  getCountries():Observable<ResponseViewModelGeneric<CountryDto[]>>{
    const cachedData = this.countryCached$.getValue();
    if(cachedData){
      return this.countryCached$.asObservable();
    }else{
      let url = `${this._apiURL}Lookup/GetCountries`;
      const headers= new HttpHeaders({'Content-Type':'application/json'});
      return this._http.get<ResponseViewModelGeneric<CountryDto[]>>(url,{headers:headers}).pipe(
        tap(data =>{
          this.countryCached$.next(data);
        })
      );
    }
  }
}
