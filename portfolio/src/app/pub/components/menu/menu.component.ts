import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../../admin/services/auth.sevice';

@Component({
  selector: 'app-menu',
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private authService:AuthService) {

  }

  logOut():void {
    this.authService.logout();
  }
}


