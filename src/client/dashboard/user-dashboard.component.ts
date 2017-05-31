// External Deps
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// Our Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { UserService } from 'client/core/user.service';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.jade'
})

export class UserDashboardComponent implements OnInit, OnDestroy {
  user: any;
  showInstructor: boolean;
  subscriptions: { route?: Subscription } = {};
  constructor(
    private viewState: ViewReadyService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.userService.$;
    this.subscriptions.route = this.activatedRoute.url.subscribe(
      data => {
        this.showInstructor = data[0].path === 'dashboard';
        this.viewState.emitFinished();
      },
      error => console.error(error));
  }

  ngOnDestroy() {
    this.subscriptions.route.unsubscribe();
  }

}