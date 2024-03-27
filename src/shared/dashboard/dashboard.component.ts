import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {filter} from "rxjs";
import PerfectScrollbar from "perfect-scrollbar";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    TitleCasePipe,
    RouterLinkActive,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit,AfterViewInit {
  pageTitle: string = '';
  isSidebarShown: boolean = false;
  username :string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log(event.urlAfterRedirects)
        const segments = event.urlAfterRedirects.split('/');
        let lastSegment = segments.pop();
        if (lastSegment.includes('-')) {
          lastSegment = lastSegment.replace(/-/g, ' ');
        }
        this.pageTitle = lastSegment;
        this.isSidebarShown = false;
      });

    let token  = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    this.username = decodedToken['name'];
  }

  ngAfterViewInit(): void {
    this.initializePerfectScrollbar();

  }

  private initializePerfectScrollbar(): void {
    const mainpanel = this.elementRef.nativeElement.querySelector('.main-content');
    const sidebar = this.elementRef.nativeElement.querySelector('.sidenav');
    const fixedplugin = this.elementRef.nativeElement.querySelector('.fixed-plugin');
    const navbarCollapse = this.elementRef.nativeElement.querySelector('.navbar-collapse');

    new PerfectScrollbar(mainpanel);
    new PerfectScrollbar(sidebar);
    new PerfectScrollbar(fixedplugin);
    new PerfectScrollbar(navbarCollapse);
  }

  toggleSidebar() {
    this.isSidebarShown = !this.isSidebarShown;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
