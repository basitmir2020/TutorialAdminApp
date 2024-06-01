import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {AdminModule} from "./admin/admin.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideToastr} from "ngx-toastr";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {SharedService} from "../shared/services/shared.service";
import {SharedHttpService} from "../shared/services/shared-http.service";
import {JwtInterceptor} from "../shared/interceptor/jwt.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    SharedService,
    SharedHttpService,
    AdminModule,
    BrowserModule,
    BrowserAnimationsModule,
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    provideToastr({
      preventDuplicates:true,
      positionClass:'toast-top-right'
    }),
    {
      provide : HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true
    }, provideAnimationsAsync()
  ],
};
