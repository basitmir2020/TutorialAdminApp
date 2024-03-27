import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {AdminModule} from "./admin/admin.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideToastr} from "ngx-toastr";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AdminModule,
    BrowserModule,
    BrowserAnimationsModule,
    provideAnimationsAsync(),
    provideHttpClient(),
    provideToastr({
      timeOut:10000,
      preventDuplicates:true,
      positionClass:'toast-bottom-right'
    }),
  ],
};
