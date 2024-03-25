import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {filter} from "rxjs";
import {NavbarSidebarService} from "../services/navbar-sidebar.service";

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
export class DashboardComponent implements OnInit {
  pageTitle: string = '';
  isMenuOpen: boolean = false;

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
      });
  }

  isSidebarShown: boolean = false;

  toggleSidebar() {
    this.isSidebarShown = !this.isSidebarShown;
  }
}
