import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {SharedService} from "../../../../../../shared/services/shared.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ErrorStateValidator} from "../../../../../auth/login/validators/errorstate.validator";
import {ExamSubjectsVM} from "../../../../../../shared/models/common.model";
import {AddSubjectChaptersService} from "./services/add-subject-chapters.service";
import {dropdownBoxValueChange} from "../../../../validators/error.validator";

@Component({
  selector: 'app-add-subject-chapters',
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
  templateUrl: './add-subject-chapters.component.html',
  styleUrl: './add-subject-chapters.component.css'
})
export class AddSubjectChaptersComponent implements OnInit {
  subjectChaptersFormGroup : FormGroup;
  examSubjects:ExamSubjectsVM[]=[];

  constructor(
    private _spinnerService:NgxSpinnerService,
    private _sharedService : SharedService,
    private _formBuilder : FormBuilder,
    private _addSubjectChaptersServices:AddSubjectChaptersService,
    private _toastrService : ToastrService,
    private _router : Router) { }

  ngOnInit(): void {
    this._spinnerService.show().then(r => {});
    this.getSubjects();
    this.subjectChaptersFormGroup = this._formBuilder.group({
      subjectId : ['default',[Validators.required,dropdownBoxValueChange]],
      chapterName : [null,[Validators.required]]
    });
  }

  matcher = new ErrorStateValidator();

  getSubjects(){
    this._sharedService.getExamSubjects().subscribe(res=> {
      if(res.success && res.statusCode == 200){
        this.examSubjects = res.data;
      }
    });
    this._spinnerService.hide().then(r => {});
  }


  saveSubjectChapters() {
    this._spinnerService.show().then();
    if(this.subjectChaptersFormGroup.valid){
      this._addSubjectChaptersServices.saveSubjectChapters(this.subjectChaptersFormGroup.value).subscribe(res => {
        if(res.statusCode == 200 && res.success){
          this._spinnerService.hide().then();
          this._toastrService.success(res.message);
          this._router.navigate(['/admin/manage-subject-chapters']).then();
        }else{
          this._spinnerService.hide().then();
          this._toastrService.error(res.message);
        }
      });
    }
  }
}
