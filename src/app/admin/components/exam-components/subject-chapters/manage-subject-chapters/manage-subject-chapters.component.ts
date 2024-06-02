import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {
  DeleteSubjectChapters,
  GetAllSubjectChapters,
  SubjectChapterStatus
} from "./model/manage-subject-chapters.model";
import {ManageSubjectChaptersService} from "./services/manage-subject-chapters.service";
import Swal from "sweetalert2";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {NgIf, TitleCasePipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-manage-subject-chapters',
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
  templateUrl: './manage-subject-chapters.component.html',
  styleUrl: './manage-subject-chapters.component.css'
})
export class ManageSubjectChaptersComponent implements OnInit{
  allSubjectChapters: GetAllSubjectChapters[] = [];
  displayedColumns: string[] = ['SubjectName','ChapterName', 'Status','Action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  totalItems: number;
  pageSize: number = 10;
  pageIndex: number = 0;
  filterValue : string = null;
  constructor(
    private _manageSubjectChaptersService:ManageSubjectChaptersService,
    private _spinnerService : NgxSpinnerService,
    private _toastrService:ToastrService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this._spinnerService.show().then();
    this.loadSubjectChapters();
  }

  private loadSubjectChapters() {
    this._manageSubjectChaptersService.GetAllSubjectChapters(this.filterValue, 'Sequence', this.pageIndex + 1, this.pageSize).subscribe(response => {
      this.allSubjectChapters = response.data;
      this.totalItems = response.totalItems;
      this.dataSource = new MatTableDataSource<any>(this.allSubjectChapters);
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
    this.loadSubjectChapters();
  }

  applyFilter(value: any): void {
    if (value && value.length > 3) {
      this.filterValue = value;
    } else {
      this.filterValue = null;
    }
    this.loadSubjectChapters();
  }

  editSubjectChapters(id:number){
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
  deleteSubjectChapters(id:number){
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
        let model = new DeleteSubjectChapters();
        model.subjectChapterId = id;
        this._manageSubjectChaptersService.DeleteSubjectChaptersById(model).subscribe(res =>{
          if(res.success && res.statusCode == 200){
            this._toastrService.success(res.message);
            this.loadSubjectChapters();
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
        let model = new SubjectChapterStatus();
        model.subjectChapterId = id;
        model.statusId = status == 'Active' ? 1 : 2;
        this._manageSubjectChaptersService.ChangeSubjectChaptersStatus(model).subscribe((res)=>{
          if(res.success && res.statusCode == 200){
            this._toastrService.success(res.message);
            this.loadSubjectChapters();
          }else{
            this._toastrService.error(res.message);
          }
        })
      }
    });
  }
}
