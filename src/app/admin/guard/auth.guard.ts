import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if(token != null){
    return true;
  }else {
    inject(Router).navigate(["/"]).then(r => {});
    inject(ToastrService).error("You Are Not Authorised!");
    return false;
  }
};
