import { Injectable } from '@angular/core';
import {SharedHttpService} from "./shared-http.service";
import {catchError, map, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private _sharedHttpService:SharedHttpService,
    private _router: Router,
    private _toastrService: ToastrService
  ) { }

  loggedInUser(){
    return this._sharedHttpService.loggedUser();

  }

  canActivate() {
    return this._sharedHttpService.loggedUser().pipe(
      map(user => {
        if (user && user.data.role == 'Admin') {
          return true;
        } else {
          this._toastrService.error('You Are Not Authorized!');
          this._router.navigate(['/login']).then();
          return false;
        }
      }),
      catchError(() => {
        this._toastrService.error('You Are Not Authorized!');
        this._router.navigate(['/login']).then();
        return of(false);
      })
    );
  }

  getCountries(){
    return this._sharedHttpService.getCountries();
  }
}
