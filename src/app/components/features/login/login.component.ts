import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username e password sono obbligatori.';
      return;
    }

    this.login();
  }

  async login() {
    console.log('Login in corso...');
    try {
      await this.authService.login(this.username, this.password);
      this.errorMessage = '';
      this.router.navigate(['/dashboard/catalogo']);
    } catch (error) {
      console.error('Errore durante il login:', error);
      this.errorMessage = 'Errore durante il login: ' + (error as Error).message || 'Errore sconosciuto';
    }
  }
}
