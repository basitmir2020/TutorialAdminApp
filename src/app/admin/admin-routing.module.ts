import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../../shared/dashboard/dashboard.component";
import {IndexComponent} from "./components/index/index.component";
import {
  SubjectAddChapterComponent
} from "./components/exam-components/subject-add-chapter/subject-add-chapter.component";
import {QuestionsComponent} from "./components/exam-components/questions/questions.component";
import {authGuard} from "./guard/auth.guard";
import {ManageExamComponent} from "./components/exam-components/exam-types/manage-exam/manage-exam.component";
import {AddExamComponent} from "./components/exam-components/exam-types/add-exam/add-exam.component";
import {UpdateExamComponent} from "./components/exam-components/exam-types/update-exam/update-exam.component";

const routes: Routes = [
  {
    path:'',component:DashboardComponent,canActivate:[authGuard],
    children:[
      {path :'dashboard',component:IndexComponent},
      {path:'add-exam-types',component:AddExamComponent},
      {path:'manage-exam-types',component:ManageExamComponent},
      {path:'update-exam-type/:id',component:UpdateExamComponent},
      {path:'manage-subject',component:SubjectAddChapterComponent},
      {path:'manage-questions',component:QuestionsComponent},
      {path:'',redirectTo:'/admin/dashboard',pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
