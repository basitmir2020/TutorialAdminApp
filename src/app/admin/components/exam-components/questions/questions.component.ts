import {Component, OnInit} from '@angular/core';
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    NgxSpinnerModule
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit{
  constructor(private _spinnerService:NgxSpinnerService) {}

  ngOnInit(): void {
    this._spinnerService.show().then(r => {});

    setTimeout(()=>{
      this._spinnerService.hide().then(r => {});
    },1000);
  }
}
