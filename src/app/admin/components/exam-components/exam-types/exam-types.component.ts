import {Component, OnInit} from '@angular/core';
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-exam-types',
  standalone: true,
  imports: [
    NgxSpinnerModule
  ],
  templateUrl: './exam-types.component.html',
  styleUrl: './exam-types.component.css'
})
export class ExamTypesComponent implements OnInit{

  constructor(private _spinnerService:NgxSpinnerService) {}

  ngOnInit(): void {
    this._spinnerService.show().then(r => {});

    setTimeout(()=>{
      this._spinnerService.hide().then(r => {});
    },1000);
  }

}
