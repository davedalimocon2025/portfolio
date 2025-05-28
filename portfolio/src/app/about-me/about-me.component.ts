


import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'expansion-overview-example',
  templateUrl: 'about-me.component.html',
  imports: [MatExpansionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent {
  readonly panelOpenState = signal(false);
}
