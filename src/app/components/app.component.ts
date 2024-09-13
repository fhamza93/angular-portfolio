import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authChecked$.subscribe(authChecked => {
      if (authChecked) {
        this.isLoading = false; 
        this.authService.loggedIn$.subscribe(isLoggedIn => {
          if (isLoggedIn) {
            console.log('Utente loggato');
            this.router.navigate(['/dashboard/catalogo']);
          } else {
            console.log('Utente non loggato');
            this.router.navigate(['/login']); 
          }
        });
      }
    });
  }
}
