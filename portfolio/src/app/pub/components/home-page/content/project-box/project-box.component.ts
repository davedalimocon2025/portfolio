import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-project-box',
  imports: [MatExpansionModule],
  templateUrl: './project-box.component.html',
  styleUrl: './project-box.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProjectBoxComponent {
  readonly panelOpenState = signal(true);

}


