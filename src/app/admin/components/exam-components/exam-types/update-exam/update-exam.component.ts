import {Component, OnInit} from '@angular/core';
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CountryDto} from "../../../../../../shared/models/common.model";
import {SharedService} from "../../../../../../shared/services/shared.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {dropdownBoxValueChange} from "../../../../validators/error.validator";
import {UpdateExamService} from "./services/update-exam.service";
import {GetExamType} from "./model/update-exam.model";
import {ErrorStateValidator} from "../../../../../auth/login/validators/errorstate.validator";

@Component({
  selector: 'app-update-exam',
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
  templateUrl: './update-exam.component.html',
  styleUrl: './update-exam.component.css'
})
export class UpdateExamComponent implements OnInit {
  countries : CountryDto[] = [];
  examTypeFormGroup : FormGroup;

  constructor(
    private _spinnerService:NgxSpinnerService,
    private _sharedService : SharedService,
    private _formBuilder : FormBuilder,
    private _activeRoute : ActivatedRoute,
    private _updateExamTypeService:UpdateExamService,
    private _toastrService : ToastrService,
    private _router : Router
  ) {}


  ngOnInit(): void {
    this._spinnerService.show().then(r => {});
    this.getCountries();

    this.examTypeFormGroup = this._formBuilder.group({
      id:[0],
      countryId : ['default',[Validators.required,dropdownBoxValueChange]],
      examType : [null,[Validators.required]],
      examSubType : [null,[Validators.required]]
    });

    let id = this._activeRoute.snapshot.params['id'];
    if(id > 0){
      this.getExamTypeDataById(id);
    }
  }

  matcher = new ErrorStateValidator();

  getExamTypeDataById(id:number){
    this._updateExamTypeService.getExamTypeById(id).subscribe((res)=>{
      if(res.success && res.statusCode == 200){
       this.displayExamType(res.data);
      }else{
        this._toastrService.error("No Exam Type Present!");
        this._router.navigate(['/admin/manage-exam-types']).then();
      }
    });
  }

  displayExamType(data:GetExamType){
    this.examTypeFormGroup.patchValue({
      id:data.id,
      countryId : data.countryId,
      examType : data.examType,
      examSubType : data.examSubType,
    });
    this._spinnerService.hide().then();
  }

  getCountries(){
    this._sharedService.getCountries().subscribe(res=> {
      if(res.success && res.statusCode == 200){
        this.countries = res.data;
      }
    });
  }

  updateExamType() {
    this._spinnerService.show().then();
    if(this.examTypeFormGroup.valid){
      this._updateExamTypeService.updateExamType(this.examTypeFormGroup.value).subscribe(res => {
        if(res.statusCode == 200 && res.success){
          this._spinnerService.hide().then();
          this._toastrService.success(res.message);
          this._router.navigate(['/admin/manage-exam-types']).then();
        }else{
          this._spinnerService.hide().then();
          this._toastrService.error(res.message);
        }
      });
    }
  }
}
