import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavResponsiveExample } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidenavResponsiveExample],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
}
