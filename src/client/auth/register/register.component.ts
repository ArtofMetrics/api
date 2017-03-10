// NPM Deps
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ViewReadyService } from 'client/shared//view-ready.service';

// AOM Deps
import { UserService } from 'client/core/user.service';
import { SignupResponse } from 'client/auth/register/models';

@Component({
  selector: 'register',
  templateUrl: './register.component.jade'
})

export class RegisterComponent implements OnInit {
  doc: any;

  constructor(
    private viewState: ViewReadyService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.viewState.emitFinished();
  }

  onRegister = (data: SignupResponse) => {
    this.userService.setUser(data);
    this.redirectOnSuccess(data.user);
  }

  redirectOnSuccess = (user) => {
    this.router.navigate(['/']);
  }

}