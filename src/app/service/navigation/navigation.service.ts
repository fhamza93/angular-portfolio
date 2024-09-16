import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private currentMenuItem: string | null = null;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentMenuItem = this.router.url;
      localStorage.setItem('currentMenuItem', this.currentMenuItem);
    });
  }

  setMenuItem(menuItem: string) {
    this.currentMenuItem = menuItem;
    localStorage.setItem('currentMenuItem', menuItem);
  }

  getMenuItem(): string | null {
    return localStorage.getItem('currentMenuItem');
  }

  clearMenuItem() {
    this.currentMenuItem = null;
    localStorage.removeItem('currentMenuItem');
  }
}
