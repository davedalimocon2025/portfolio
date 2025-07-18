import { Component } from '@angular/core';
import { ChartDisplayComponent } from "../chart-display/chart-display.component";
import { ChartDisplayComponent2 } from "../chart-display2/chart-display2.component";
import {MatTabsModule} from '@angular/material/tabs';
import { AdminPostsComponent } from "../posts/posts.component";
import { LogoutComponent } from '../../auth/logout/logout.component';

@Component({
  selector: 'app-dashboard',
  imports: [ChartDisplayComponent, ChartDisplayComponent, ChartDisplayComponent2, MatTabsModule, AdminPostsComponent, AdminPostsComponent, LogoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
}
