import {Component, OnInit} from '@angular/core';
import { Router, RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {
  Validators,
  FormsModule,
  ReactiveFormsModule, FormGroup, FormBuilder,
} from '@angular/forms';
import {ErrorStateValidator} from "./validators/errorstate.validator";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {LoginService} from "./services/login.service";
import {TokenResponseViewModel} from "./models/auth.model";
import { HttpClient } from "@angular/common/http";
import {LoginHttpService} from "./services/login-http.service";
import {SharedService} from "../../../shared/services/shared.service";
import {SharedHttpService} from "../../../shared/services/shared-http.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers:[
    HttpClientModule,
    HttpClient,
    LoginService,
    LoginHttpService,
    SharedService,
    SharedHttpService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  hide = true;
  loginFormGroup : FormGroup;
  constructor(
    private router : Router,
    private _spinnerService : NgxSpinnerService,
    private _formBuilder : FormBuilder,
    private _toastrService : ToastrService,
    private _loginService : LoginService,
    private _sharedService : SharedService
  ) {}

  ngOnInit(): void {
    this._spinnerService.show().then(r => {});
    this.loginFormGroup = this._formBuilder.group({
      email : [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
    this._spinnerService.hide().then();
  }

  matcher = new ErrorStateValidator();

  login(){
    this._spinnerService.show().then();
    if(this.loginFormGroup.valid){
      this._loginService.loginUser(this.loginFormGroup.value).subscribe((res:TokenResponseViewModel)=>{
        if(res.statusCode == 200 && res.success){
          localStorage.setItem("token",String(res.token));
          this._sharedService.loggedInUser().subscribe(user =>{
            if(user.data.role == "Admin"){
              this.router.navigate(['admin/dashboard']).then();
            }else{
             this._spinnerService.hide().then();
             this._toastrService.error("You Are Not Authorised!");
           }
         });
        }else{
          this._spinnerService.hide().then();
          this._toastrService.error(res.message);
        }
      });
    }
  }

  hideShowPassword(){
    this.hide = !this.hide
  }
}
