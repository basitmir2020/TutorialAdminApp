import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {NgxSpinnerModule} from "ngx-spinner";
import {ExamTypesComponent} from "./components/exam-components/exam-types/exam-types.component";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxSpinnerModule,
    ExamTypesComponent
  ],
  exports:[NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
