// External Deps
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// AOM Deps
import { UserService } from 'client/core/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log('in can activate')
    return this.userService.isLoggedInAsync()
      .then(res => {
        if (res && this.userService.isAdmin()) {
          return true;
        } else {
          this.router.navigate([`/login`]);

          return false;
        }
      })
      .catch(error => {
        console.error(error);
        return false;
      });

  }
}