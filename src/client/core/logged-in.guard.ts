import { CanActivate,
         ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**
 * Returns an observable of a boolean to determine if user is logged in
 */
export class LoggedInGuard implements CanActivate {
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}