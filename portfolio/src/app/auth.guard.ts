
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './admin/services/auth.sevice';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  isUserLoggedIn:boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    this.isUserLoggedIn = this.authService.isUserLoggedIn();

    if (this.isUserLoggedIn) {
      return this.isUserLoggedIn;
    } else {
      return this.router.createUrlTree(['/auth/login']);
    }
  
  }
}