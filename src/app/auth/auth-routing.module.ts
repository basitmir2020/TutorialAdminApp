import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {OtpVerificationComponent} from "./otp-verification/otp-verification.component";

const routes: Routes = [
  { path:'',component:LoginComponent },
  {path:"forgotPassword",component:ForgotPasswordComponent},
  {path:"otp-verification",component:OtpVerificationComponent},
  {path:"login",redirectTo:'',pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
