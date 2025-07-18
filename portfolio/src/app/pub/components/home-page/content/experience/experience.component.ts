

import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'app-experience',
    styleUrl: './experience.component.css',
  templateUrl: './experience.component.html',
  imports: [MatExpansionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  readonly panelOpenState = signal(true);
}
