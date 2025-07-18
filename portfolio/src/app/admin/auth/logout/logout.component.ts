import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.sevice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [MatButtonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private authService:AuthService,
    private router:Router
    ) {

  }
  logOut():void {
    this.authService.logout();
    this.router.navigate(['/']);

  }
}
