// NPM Deps
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { UserService } from 'client/core/user.service';

// AOM Models
import { LoginEmailResponse } from 'server/api/auth/models';

@Component({
  selector: 'login',
  templateUrl: './login.component.jade'
})

export class LoginComponent implements OnInit {
  constructor(
    private viewState: ViewReadyService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.viewState.emitFinished();
  }

  onLoginSuccess = (data: LoginEmailResponse) => {
    this.userService.setUser(data);
    this.redirectOnSuccess();
  };

  redirectOnSuccess = () => {
    this.router.navigate(['/dashboard']);
  };
}