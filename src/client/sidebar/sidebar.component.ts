// NPM Deps
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

// Our Deps
import { UserService } from 'client/core/user.service';

@Component({
  selector: 'aom-sidebar',
  templateUrl: './sidebar.component.jade',
  encapsulation: ViewEncapsulation.None
})


export class SidebarComponent {
  NAV_SELECTOR: string = `#aom-sidebar`;

  constructor(private userService: UserService, private router: Router) { }

  public logout = () => {
    this.userService.logout();
    this.router.navigate(['/register']);
  };

}