import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth.service';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent {

  constructor(private authService: AuthService) { }

  isSeller(){
    return this.authService.isCurrentUserAdmin();
  }
}
