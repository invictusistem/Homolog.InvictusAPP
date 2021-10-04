import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  jwtHelper = new JwtHelperService();
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('jwt');
   // console.log(!this.jwtHelper.isTokenExpired(token));
   // console.log(token)

    if ((localStorage.getItem('jwt') !== null) && 
    (!this.jwtHelper.isTokenExpired(token))) {
      //console.log('canactivate inside')
      return true;
    } else {
      this.router.navigate(['/user/login']);
      //console.log('canactivate inside')
      return false;
    }
  }
}

