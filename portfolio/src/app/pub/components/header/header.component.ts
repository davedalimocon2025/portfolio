import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ContentComponent } from '../home-page/content/content.component';
import { ButtonPostsComponent } from "../button-posts/button-posts.component";
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { AuthService } from '../../../admin/services/auth.sevice';
import { FooterComponent } from '../footer/footer.component';
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
    RouterOutlet,
    ContentComponent,
    RouterLink,
    ButtonPostsComponent,
     MenuComponent,
    FooterComponent],
})
export class SidenavResponsiveExample implements OnDestroy, OnInit {
  protected readonly fillerNav = ["1","2",'3'];
  protected readonly isMobile = signal(true);
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  isUserLoggedIn: boolean = false;


  constructor(private router: Router,
    private authService: AuthService
  ) {
    const media = inject(MediaMatcher);
    this._mobileQuery = media.matchMedia('(max-width: 1px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.isUserLoggedIn = authService.isUserLoggedIn();
  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  protected readonly shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
    window.location.host,
  );
  auth(): void {
    console.log("clicked!")
    this.router.navigate(['/admin']);
  }
}
