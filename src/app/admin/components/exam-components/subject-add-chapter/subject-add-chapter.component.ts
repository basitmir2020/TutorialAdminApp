import {Component, OnInit} from '@angular/core';
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-subject-add-chapter',
  standalone: true,
    imports: [
       NgxSpinnerModule
    ],
  templateUrl: './subject-add-chapter.component.html',
  styleUrl: './subject-add-chapter.component.css'
})
export class SubjectAddChapterComponent implements OnInit{
  constructor(private _spinnerService:NgxSpinnerService) {}

  ngOnInit(): void {
    this._spinnerService.show().then(r => {});

    setTimeout(()=>{
      this._spinnerService.hide().then(r => {});
    },1000);
  }
}
