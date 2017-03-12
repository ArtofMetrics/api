// External Deps
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// AOM Deps
import { UserService } from 'client/core/user.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.userService.isLoggedInAsync()
      .then(res => {
        if (res) {
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