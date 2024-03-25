import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {filter} from "rxjs";
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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit,AfterViewInit {
  pageTitle:string = '';

  iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
  iconSidenav = document.getElementById('iconSidenav');
  sidenav = document.getElementById('sidenav-main');
  body = document.getElementsByTagName('body')[0];
  className = 'g-sidenav-pinned';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.initializePerfectScrollbar();
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
      });
  }

  private initializePerfectScrollbar(): void {
    const mainpanel = this.elementRef.nativeElement.querySelector('.main-content');
    const sidebar = this.elementRef.nativeElement.querySelector('.sidenav');
    const fixedplugin = this.elementRef.nativeElement.querySelector('.fixed-plugin');
    const navbarCollapse = this.elementRef.nativeElement.querySelector('.navbar-collapse');

    let ps = new PerfectScrollbar(mainpanel);
    let ps1 = new PerfectScrollbar(sidebar);
    let ps2 = new PerfectScrollbar(fixedplugin);
    let ps3 = new PerfectScrollbar(fixedplugin);


    if (this.iconNavbarSidenav) {
      this.iconNavbarSidenav.addEventListener("click", this.toggleSidenav);
    }

    if (this.iconSidenav) {
      this.iconSidenav.addEventListener("click", this.toggleSidenav);
    }
  }

  private toggleSidenav() {
    if (this.body.classList.contains(this.className)) {
      this.body.classList.remove(this.className);
      setTimeout(()=>{
        this.sidenav?.classList.remove('bg-white');
      }, 100);
      this.sidenav?.classList.remove('bg-transparent');

    } else {
      this.body.classList.add(this.className);
      this.sidenav?.classList.add('bg-white');
      this.sidenav?.classList.remove('bg-transparent');
      this.iconSidenav?.classList.remove('d-none');
    }
  }
}
