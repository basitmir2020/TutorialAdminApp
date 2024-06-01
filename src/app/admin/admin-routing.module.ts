import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../../shared/dashboard/dashboard.component";
import {IndexComponent} from "./components/index/index.component";
import {authGuard} from "./guard/auth.guard";
import {ManageExamComponent} from "./components/exam-components/exam-types/manage-exam/manage-exam.component";
import {AddExamComponent} from "./components/exam-components/exam-types/add-exam/add-exam.component";
import {UpdateExamComponent} from "./components/exam-components/exam-types/update-exam/update-exam.component";
import {
  AddExamSubjectsComponent
} from "./components/exam-components/exam-subjects/add-exam-subjects/add-exam-subjects.component";
import {
  ManageExamSubjectsComponent
} from "./components/exam-components/exam-subjects/manage-exam-subjects/manage-exam-subjects.component";

const routes: Routes = [
  {
    path:'',component:DashboardComponent,canActivate:[authGuard],
    children:[
      {path :'dashboard',component:IndexComponent},
      {path:'add-exam-types',component:AddExamComponent},
      {path:'manage-exam-types',component:ManageExamComponent},
      {path:'update-exam-type/:id',component:UpdateExamComponent},
      {path:'add-exam-subjects',component:AddExamSubjectsComponent},
      {path:'manage-exam-subjects',component:ManageExamSubjectsComponent},
      {path:'',redirectTo:'/admin/dashboard',pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
