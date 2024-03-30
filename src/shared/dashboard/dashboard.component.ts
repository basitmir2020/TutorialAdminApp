import { Component, OnInit} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {filter} from "rxjs";
import {SharedService} from "../services/shared.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NavigationComponent} from "../navigation/navigation.component";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import Swal from "sweetalert2";
import {
  DeleteExamType
} from "../../app/admin/components/exam-components/exam-types/manage-exam/model/all-exam-type.model";
import PerfectScrollbar from "perfect-scrollbar";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    TitleCasePipe,
    RouterLinkActive,
    MatButtonModule, MatMenuModule,
    MatIcon, NavigationComponent,SweetAlert2Module
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  pageTitle: string = '';
  isSidebarShown: boolean = false;
  showMenu: boolean = false;
  username :string;
  role :string;
  currentYear:number;

  constructor(
    private router: Router,
    private _sharedService : SharedService
  ) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const segments = event.url;
        console.log(segments);
        switch (segments){
          case "/admin/dashboard":
            this.pageTitle = "Dashboard";
            break;
          case "/admin/add-exam-types":
            this.pageTitle = "Add Exam Type";
            break;
          case "/admin/manage-exam-types":
            this.pageTitle = "Manage Exam Type";
            break;
          case "/admin/update-exam-type/":
            this.pageTitle = "Update Exam Type";
            break;
        }
        this.isSidebarShown = false;
      });
    this.getName();
    let currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
  }

  getName(){
    this._sharedService.loggedInUser().subscribe(res => {
      if(res.success && res.statusCode == 200){
        this.username = res.data.userName;
        this.role = res.data.role;
      }
    });
  }

  logout(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t to Logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor:"#c92a2a",
      cancelButtonColor:"#4c566a"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  toggleNavItems(value : boolean){
    this.isSidebarShown = !value;
  }

  ngAfterViewInit(): void {
    this.initializePerfectScrollbar();
  }

  initializePerfectScrollbar(): void {
    const mainpanel = document.getElementById('vertical-example'),
      sidebar = document.getElementById('horizontal-example'),
      navbarCollapse = document.getElementById('both-scrollbars-example');

    if (mainpanel) {
      new PerfectScrollbar(mainpanel, {
        wheelPropagation: false
      });
    }
    if (sidebar) {
      new PerfectScrollbar(sidebar, {
        wheelPropagation: false,
        suppressScrollY: true
      });
    }
    if (navbarCollapse) {
      new PerfectScrollbar(navbarCollapse, {
        wheelPropagation: false
      });
    }
  }
}
