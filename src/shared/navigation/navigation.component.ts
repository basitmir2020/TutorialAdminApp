import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import PerfectScrollbar from "perfect-scrollbar";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements AfterViewInit{


  constructor(private elementRef: ElementRef) {}

  isSidebarShown: boolean = false;
  @Input() showMenu!: boolean;
  toggleNavItems(value : boolean){
    this.isSidebarShown = !value;
  }

  ngAfterViewInit(): void {
    this.initializePerfectScrollbar();
  }

  private initializePerfectScrollbar(): void {
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

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }
}
