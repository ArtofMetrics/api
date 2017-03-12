// External Deps
import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

// AOM Deps
import { ApiService } from 'client/core/api/api.service';
import { UserService } from 'client/core/user.service';

// AOM Models
import { LoginEmailResponse } from 'server/api/auth/models';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.jade'
})

export class LoginFormComponent {
  @Output()
  onLogin: EventEmitter<any> = new EventEmitter<any>();

  login: { email: string, password: string } = { email: '', password: ''};
  constructor(
    private apiService: ApiService
  ) {}
  
  emailLogin = (ev, form: NgForm) => {
    this.apiService.auth
      .authenticateEmail(this.login)
      .subscribe((data: LoginEmailResponse) => this.onLogin.emit(data));
      
  }
}