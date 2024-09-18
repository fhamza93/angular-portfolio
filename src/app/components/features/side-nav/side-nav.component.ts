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
  menuItems: any[] = [];
  
  catalogoMenuItem = { label: 'Catalogo', routerLink: '/dashboard/catalogo', icon: 'home' };
  insertBookMenuItem = { label: 'Inserisci Libro', routerLink: '/dashboard/nuovo_libro', icon: 'add_circle' };
  bestsellerMenuItem = { label: 'Bestseller', routerLink: '/dashboard/bestseller', icon: 'star' };
  offerteMenuItem = { label: 'Offerte', routerLink: '/dashboard/offerte', icon: 'local_offer' };
  personaleMenuItem = { label: 'Personale', routerLink: '/dashboard/personale', icon: 'group' };
  chiSiamoMenuItem = { label: 'Chi Siamo', routerLink: '/dashboard/chi_siamo', icon: 'info' };
  contattiMenuItem = { label: 'Contatti', routerLink: '/dashboard/contatti', icon: 'phone' };
  logoutMenuItem = { label: 'Logout', routerLink: '', icon: 'logout', action: true };

  constructor(private authService: AuthService, private router: Router, private navigationService: NavigationService) {}

  ngOnInit() {
    this.menuItems = this.authService.isCurrentUserAdmin() ? [
      this.catalogoMenuItem,
      this.insertBookMenuItem,
      this.bestsellerMenuItem,
      //this.offerteMenuItem,
      this.personaleMenuItem,
      this.chiSiamoMenuItem,
      this.contattiMenuItem,
      this.logoutMenuItem
     ] : [
      this.catalogoMenuItem,
      this.bestsellerMenuItem,
      //this.offerteMenuItem,
      this.personaleMenuItem,
      this.chiSiamoMenuItem,
      this.contattiMenuItem,
      this.logoutMenuItem
     ];

    this.currentMenuItem = this.navigationService.getMenuItem();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentMenuItem = this.router.url;
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

  menuTitle() {
    return this.authService.isCurrentUserAdmin() ? 'Venditore' : 'Cliente';
  }
}
