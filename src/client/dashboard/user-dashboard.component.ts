// External Deps
import { Component, OnInit } from '@angular/core';

// Our Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { UserService } from 'client/core/user.service';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.jade'
})

export class UserDashboardComponent implements OnInit {
  user: any;
  
  constructor(
    private viewState: ViewReadyService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.$;
    this.viewState.emitFinished();
  }

}