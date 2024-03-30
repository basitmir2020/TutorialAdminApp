import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {SharedService} from "../../../shared/services/shared.service";
export const authGuard: CanActivateFn = (route, state) => {
  return inject(SharedService).canActivate();
};
