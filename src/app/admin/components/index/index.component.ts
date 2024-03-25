import {Component, OnInit} from '@angular/core';
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    NgxSpinnerModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  constructor(private _spinnerService:NgxSpinnerService) {}

  ngOnInit(): void {
    this._spinnerService.show().then(r => {});

    setTimeout(()=>{
      this._spinnerService.hide().then(r => {});
    },1000);
  }
}
