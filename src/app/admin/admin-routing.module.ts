import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../../shared/dashboard/dashboard.component";
import {IndexComponent} from "./components/index/index.component";
import {ExamTypesComponent} from "./components/exam-components/exam-types/exam-types.component";
import {
  SubjectAddChapterComponent
} from "./components/exam-components/subject-add-chapter/subject-add-chapter.component";
import {QuestionsComponent} from "./components/exam-components/questions/questions.component";

const routes: Routes = [
  {
    path:'',component:DashboardComponent,
    children:[
      {path :'dashboard',component:IndexComponent},
      {path:'manage-exam-types',component:ExamTypesComponent},
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
