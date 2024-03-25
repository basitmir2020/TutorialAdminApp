import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarSidebarService {

  constructor() { }

  initializePerfectScrollbar(element: any): void {
    // Initialize PerfectScrollbar
    // You can implement this method using PerfectScrollbar library in Angular way
  }

  toggleNavbarBlurOnScroll(id: any): void {
    // Implement navbar blur on scroll functionality
  }

  toggleSidenav(): void {
    // Implement toggle sidenav functionality
  }

  toggleSidebarColor(color: any): void {
    // Implement toggling sidebar color
  }

  toggleNavbarFixed(el: HTMLElement): void {
    // Implement toggling navbar fixed functionality
  }

}
