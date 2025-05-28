import {MediaMatcher} from '@angular/cdk/layout';
import {Component, OnDestroy, inject, signal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ContentComponent } from '../content/content.component';

/** @title Responsive sidenav */
@Component({
  selector: 'sidenav-responsive-example',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [MatToolbarModule,
            MatButtonModule,
            MatIconModule, 
            MatSidenavModule, 
            MatListModule,
            ContentComponent,
          ],
})
export class SidenavResponsiveExample implements OnDestroy {
  protected readonly fillerNav = ["E-commerce", "Zoom Clone", "Reddit Clone", "TikTok Clone"];

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  protected readonly shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
    window.location.host,
  );
}
