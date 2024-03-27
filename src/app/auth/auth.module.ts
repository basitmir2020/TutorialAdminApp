import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  providers:[
    HttpClient
  ],
  exports:[NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule { }
