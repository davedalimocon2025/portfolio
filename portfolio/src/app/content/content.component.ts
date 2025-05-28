import { Component } from '@angular/core';
import { ProfileComponent } from "../profile/profile.component";
import { ProjectBoxComponent } from "../project-box/project-box.component";
import { AboutMeComponent } from "../about-me/about-me.component";

@Component({
  selector: 'app-content',
  imports: [ProfileComponent, ProjectBoxComponent, AboutMeComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

}
