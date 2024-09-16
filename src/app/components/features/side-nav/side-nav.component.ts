import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationService } from '../../../service/navigation/navigation.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  currentMenuItem: string | null = null;

  menuItems = [
    { label: 'Catalogo', routerLink: '/dashboard/catalogo', icon: 'home' },
    { label: 'Inserisci Libro', routerLink: '/dashboard/nuovo_libro', icon: 'add_circle' },
    { label: 'Bestseller', routerLink: '/dashboard/bestseller', icon: 'star' },
    //{ label: 'Offerte', routerLink: '/dashboard/offerte', icon: 'local_offer' },
    { label: 'Personale', routerLink: '/dashboard/personale', icon: 'group' },
    { label: 'Chi Siamo', routerLink: '/dashboard/chi_siamo', icon: 'info' },
    { label: 'Contatti', routerLink: '/dashboard/contatti', icon: 'phone' },
    { label: 'Logout', routerLink: '', icon: 'logout', action: true },
  ];

  constructor(private authService: AuthService, private router: Router, private navigationService: NavigationService) {}

  ngOnInit() {
    this.currentMenuItem = this.navigationService.getMenuItem();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentMenuItem = this.router.url;
        this.router.navigate([this.currentMenuItem]);
        this.navigationService.setMenuItem(this.currentMenuItem);
      }
    });
  }

  setMenuItem(routerLink: string) {
    this.navigationService.setMenuItem(routerLink);
  }

  logout() {
    this.authService.logout();
    this.navigationService.clearMenuItem(); 
    this.router.navigate(['/login']);
  }
}
