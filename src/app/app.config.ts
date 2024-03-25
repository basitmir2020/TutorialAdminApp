import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {AdminModule} from "./admin/admin.module";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AdminModule
  ],
};
