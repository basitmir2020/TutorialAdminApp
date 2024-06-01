import {Component, OnInit, ViewChild} from '@angular/core';
import {
   MatTableDataSource, MatTableModule
} from "@angular/material/table";
import { MatInputModule} from "@angular/material/input";
import { MatMenuModule} from "@angular/material/menu";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {NgIf, TitleCasePipe} from "@angular/common";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {DeleteExamSubjects, examSubjectStatus, GetAllExamSubjects} from "./model/all-exam-subjects.model";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ManageExamSubjectService} from "./services/manage-exam-subject.service";
import {MatButtonModule} from "@angular/material/button";
import Swal from "sweetalert2";
import {ChangeStatus, DeleteExamType} from "../../exam-types/manage-exam/model/all-exam-type.model";

@Component({
  selector: 'app-manage-exam-subjects',
  standalone: true,
  imports: [
    NgxSpinnerModule,
    MatTableModule,
    NgIf,
    TitleCasePipe,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './manage-exam-subjects.component.html',
  styleUrl: './manage-exam-subjects.component.css'
})
export class ManageExamSubjectsComponent implements OnInit{
  allExamSubjects: GetAllExamSubjects[] = [];
  displayedColumns: string[] = ['ExamType', 'SubjectName', 'Status','Action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  totalItems: number;
  pageSize: number = 10;
  pageIndex: number = 0;
  filterValue : string = null;

  constructor(
    private _manageSubjectService:ManageExamSubjectService,
    private _spinnerService : NgxSpinnerService,
    private _toastrService:ToastrService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this._spinnerService.show().then();
    this.loadExamSubjects()
  }

  loadExamSubjects(): void {
    this._manageSubjectService.GetAllSubjects(this.filterValue, 'Sequence', this.pageIndex + 1, this.pageSize).subscribe(response => {
      this.allExamSubjects = response.data;
      this.totalItems = response.totalItems;
      this.dataSource = new MatTableDataSource<any>(this.allExamSubjects);
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
    this.loadExamSubjects();
  }

  applyFilter(value: any): void {
    if (value && value.length > 3) {
      this.filterValue = value;
    } else {
      this.filterValue = null;
    }
    this.loadExamSubjects();
  }

  activateStatus(status:any,id:number){
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
        let model = new examSubjectStatus();
        model.examSubjectsId = id;
        model.statusId = status == 'Active' ? 1 : 2;
        this._manageSubjectService.ChangeExamSubjectStatus(model).subscribe((res)=>{
          if(res.success && res.statusCode == 200){
            this._toastrService.success(res.message);
            this.loadExamSubjects();
          }else{
            this._toastrService.error(res.message);
          }
        })
      }
    });
  }

  editExamType(id) {
    Swal.fire({
      title: 'Are you sure?',
      /*text: 'You won\'t be edit this record!',*/
      text: 'Coming Soon',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Edit',
      cancelButtonText: 'Cancel',
      confirmButtonColor:"#087f5b",
      cancelButtonColor:"#4c566a"
    }).then((result) => {
     /* if (result.isConfirmed) {
        this._router.navigate([`/admin/update-exam-type/${id}`]).then();
      }*/
    });
  }

  deleteExamType(id) {
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
        let model = new DeleteExamSubjects();
        model.examSubjectsId = id;
        this._manageSubjectService.DeleteExamSubjectById(model).subscribe(res =>{
          if(res.success && res.statusCode == 200){
            this._toastrService.success(res.message);
            this.loadExamSubjects();
          }else{
            this._toastrService.error(res.message);
          }
        });
      }
    });
  }
}
