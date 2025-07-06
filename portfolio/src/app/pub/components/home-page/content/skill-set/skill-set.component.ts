
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-skill-set',
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.css',
  imports: [MatExpansionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillSetComponent {

  readonly panelOpenState = signal(false);
}


