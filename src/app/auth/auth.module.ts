import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({ declarations: [],
    exports: [NgxSpinnerModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [CommonModule,
        AuthRoutingModule,
        NgxSpinnerModule], providers: [
        HttpClient,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AuthModule { }
