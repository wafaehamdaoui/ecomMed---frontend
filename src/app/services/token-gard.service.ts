import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token')
    if (!token){
      this.router.navigate(['login']);
      return false
    }
    const jwtHelper = new JwtHelperService()
    const isTokenExpired = jwtHelper.isTokenExpired(token)
    if (isTokenExpired){
      this.router.navigate(['login'])
      return false
    }
    return true
  }
}

export const TokenGuardService: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}

