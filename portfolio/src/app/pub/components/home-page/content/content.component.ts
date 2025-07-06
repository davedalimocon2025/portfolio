import { Component } from '@angular/core';
import { ProfileComponent } from "../../profile/profile.component";
import { ProjectBoxComponent } from "./project-box/project-box.component";
import { AboutMeComponent } from "./about-me/about-me.component";
import { ExperienceComponent } from './experience/experience.component';
import { SkillSetComponent } from './skill-set/skill-set.component';

@Component({
  selector: 'app-content',
  imports: [ProfileComponent, 
    ProjectBoxComponent,
     AboutMeComponent,
     ExperienceComponent,
     SkillSetComponent
    ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

}
