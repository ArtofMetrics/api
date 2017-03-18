// NPM Deps
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
// Our Deps
import { UserService } from 'client/core/user.service';

@Component({
  selector: 'aom-sidebar',
  templateUrl: './sidebar.component.jade',
  encapsulation: ViewEncapsulation.None
})


export class SidebarComponent implements OnInit, OnDestroy {
  NAV_SELECTOR: string = `#aom-sidebar`;
  user: any;

  subscriptions: {
    userState?: Subscription;
  } = { userState: undefined };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    console.log(this.userService);
    this.subscriptions.userState = this.userService.state$.subscribe(
      (val: string) => {
        if (val === 'LOGGED_IN') {
          this.user = this.userService.$;
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscriptions.userState.unsubscribe();
  }

  public logout = () => {
    this.userService.logout();
    this.router.navigate(['/register']);
  };

}