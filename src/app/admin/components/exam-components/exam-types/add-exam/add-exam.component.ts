import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule} from "@angular/material/input";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {CountryDto} from "../../../../../../shared/models/common.model";
import {SharedService} from "../../../../../../shared/services/shared.service";
import {ExamTypeService} from "./services/exam-type.service";
import {ToastrService} from "ngx-toastr";
import {dropdownBoxValueChange} from "../../../../validators/error.validator";
import {ErrorStateValidator} from "../../../../../auth/login/validators/errorstate.validator";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-exam',
  standalone: true,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxSpinnerModule,
      MatExpansionModule,
      NgClass,
      NgForOf,
      NgIf
    ],
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.css'
})
export class AddExamComponent implements OnInit{
  countries : CountryDto[] = [];
  examTypeFormGroup : FormGroup;

  constructor(
    private _spinnerService:NgxSpinnerService,
    private _sharedService : SharedService,
    private _formBuilder : FormBuilder,
    private _examTypeService:ExamTypeService,
    private _toastrService : ToastrService,
    private _router : Router
  ) {}

  ngOnInit(): void {
    this._spinnerService.show().then(r => {});
    this.getCountries();

    this.examTypeFormGroup = this._formBuilder.group({
      countryId : ['default',[Validators.required,dropdownBoxValueChange]],
      examType : [null,[Validators.required]],
      examSubType : [null,[Validators.required]]
    });
  }

  matcher = new ErrorStateValidator();

  getCountries(){
    this._sharedService.getCountries().subscribe(res=> {
      if(res.success && res.statusCode == 200){
        this.countries = res.data;
      }
    });
    this._spinnerService.hide().then(r => {});
  }

  saveExamType(){
    this._spinnerService.show().then();
    if(this.examTypeFormGroup.valid){
      this._examTypeService.saveExamType(this.examTypeFormGroup.value).subscribe(res => {
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

