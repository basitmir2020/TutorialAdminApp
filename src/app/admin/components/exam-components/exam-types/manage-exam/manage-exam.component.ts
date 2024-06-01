import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {ManageExamTypeService} from "./service/manage-exam-type.service";
import {ChangeStatus, DeleteExamType, GetAllExamTypes} from "./model/all-exam-type.model";
import { MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgIf, TitleCasePipe} from "@angular/common";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import Swal from 'sweetalert2';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-exam',
  standalone: true,
  imports: [
    NgxSpinnerModule,
    MatTableModule,
    NgIf,
    TitleCasePipe,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './manage-exam.component.html',
  styleUrl: './manage-exam.component.css'
})
export class ManageExamComponent implements OnInit{
  examTypes: GetAllExamTypes[] = [];
  displayedColumns: string[] = ['CountryName','ExamType', 'ExamSubType', 'Status','Action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  totalItems: number;
  pageSize: number = 10;
  pageIndex: number = 0;
  filterValue : string = null;
  constructor(
    private _manageExamService:ManageExamTypeService,
    private _spinnerService : NgxSpinnerService,
    private _toastrService:ToastrService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this._spinnerService.show().then();
    this.loadExamTypes();
  }

  loadExamTypes(): void {
    this._manageExamService.GetAllExamTypes(this.filterValue, 'Sequence', this.pageIndex + 1, this.pageSize).subscribe(response => {
      this.examTypes = response.data;
      this.totalItems = response.totalItems;
      this.dataSource = new MatTableDataSource<any>(this.examTypes);
      this.dataSource.paginator = this.paginator;
      if (this.paginator) {
        this.paginator.pageIndex = Math.min(this.pageIndex, Math.max(0, response.totalPages - 1));
      }
      this._spinnerService.hide().then();
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadExamTypes();
  }

  applyFilter(value: any): void {
    if (value && value.length > 3) {
      this.filterValue = value;
    } else {
      this.filterValue = null;
    }
    this.loadExamTypes();
  }
  editExamType(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be edit this record!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Edit',
      cancelButtonText: 'Cancel',
      confirmButtonColor:"#087f5b",
      cancelButtonColor:"#4c566a"
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate([`/admin/update-exam-type/${id}`]).then();
      }
    });
  }
  deleteExamType(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be delete this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor:"#c92a2a",
      cancelButtonColor:"#4c566a"
    }).then((result) => {
      if (result.isConfirmed) {
        this._spinnerService.show().then();
        let model = new DeleteExamType();
        model.examTypeId = id;
        this._manageExamService.DeleteExamTypeById(model).subscribe(res =>{
          if(res.success && res.statusCode == 200){
            this._toastrService.success(res.message);
            this.loadExamTypes();
          }else{
            this._toastrService.error(res.message);
          }
        });
      }
    });
  }
  activateStatus(status:string,id:number){
    let toggleStatus = status == 'Active'? 'Deactivate' : 'Activate'
    Swal.fire({
      title: 'Are you sure?',
      text: `You won\'t to ` + toggleStatus + ` to  this record!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: toggleStatus,
      cancelButtonText: 'Cancel',
      confirmButtonColor: status == 'Active'? '#c92a2a' : '#087f5b',
      cancelButtonColor:"#4c566a"
    }).then((result) => {
      if (result.isConfirmed) {
        this._spinnerService.show().then();
        let model = new ChangeStatus();
        model.examTypeId = id;
        model.statusId = status == 'Active' ? 1 : 2;
        this._manageExamService.ChangeExamTypeStatus(model).subscribe((res)=>{
          if(res.success && res.statusCode == 200){
            this._toastrService.success(res.message);
            this.loadExamTypes();
          }else{
            this._toastrService.error(res.message);
          }
        })
      }
    });
  }
}
