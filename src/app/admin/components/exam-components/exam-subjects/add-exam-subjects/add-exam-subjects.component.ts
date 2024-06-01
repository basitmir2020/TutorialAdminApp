import {Component, OnInit} from '@angular/core';
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorStateValidator} from "../../../../../auth/login/validators/errorstate.validator";
import {SharedService} from "../../../../../../shared/services/shared.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ExamTypeVM} from "../../../../../../shared/models/common.model";
import {dropdownBoxValueChange} from "../../../../validators/error.validator";
import {ExamSubjectsHttpService} from "./services/exam-subjects-http.service";
import {ExamSubjectsService} from "./services/exam-subjects.service";

@Component({
  selector: 'app-add-exam-subjects',
  standalone: true,
    imports: [
        MatError,
        MatFormField,
        MatHint,
        MatInput,
        MatLabel,
        NgForOf,
        NgIf,
        NgxSpinnerModule,
        ReactiveFormsModule
    ],
  templateUrl: './add-exam-subjects.component.html',
  styleUrl: './add-exam-subjects.component.css'
})
export class AddExamSubjectsComponent  implements OnInit{
  examSubjectsFormGroup : FormGroup;
  examTypes : ExamTypeVM[] = [];
  matcher = new ErrorStateValidator();

  constructor(
    private examSubjectsService: ExamSubjectsService,
    private _spinnerService:NgxSpinnerService,
    private _sharedService : SharedService,
    private _formBuilder : FormBuilder,
    private _toastrService : ToastrService,
    private _router : Router
  ) {}

  ngOnInit(): void {
    this._spinnerService.show().then(r => {});
    this.getExamTypes();
    this.examSubjectsFormGroup = this._formBuilder.group({
      examTypeId : ['default',[Validators.required,dropdownBoxValueChange]],
      subjectName : [null,[Validators.required]]
    });
  }

  saveExamSubjects() {
    this._spinnerService.show().then();
    if(this.examSubjectsFormGroup.valid){
      this.examSubjectsService.saveExamSubjects(this.examSubjectsFormGroup.value).subscribe(res => {
        if(res.statusCode == 200 && res.success){
          this._spinnerService.hide().then();
          this._toastrService.success(res.message);
          this._router.navigate(['/admin/manage-exam-subjects']).then();
        }else{
          this._spinnerService.hide().then();
          this._toastrService.error(res.message);
        }
      });
    }
  }

  getExamTypes(){
    this._sharedService.getExamTypes().subscribe(res=> {
      if(res.success && res.statusCode == 200){
        this.examTypes = res.data;
      }
    });
    this._spinnerService.hide().then(r => {});
  }
}
