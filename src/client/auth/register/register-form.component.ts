// NPM Deps
import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';

// AOM Deps
import { userSchema } from 'server/dependencies/models/user';
import { ApiService } from 'client/core/api/api.service';
import { UserService } from 'client/core/user.service';
import { SignupResponse } from 'client/auth/register/models';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.jade',
  styleUrls: ['./register-form.component.styl']
})

export class RegisterFormComponent implements OnInit {
  doc: any;
  password: string;
  confirmPassword: string;
  
  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit = () => {
    this.doc = new mongoose.Document({}, userSchema);
  }

  /**
   * Executes when user clicks submit button on form
   */
  public onSubmit = (ev, form: NgForm) => {
   this.userService
    .registerEmail({ doc: this.doc, password: this.password, confirmPassword: this.confirmPassword })
    .subscribe(
      data => this.handleSuccessfulEmailSignup(data),
      error => this.handleHttpError(error, 'email')
    )
  }

  /**
   * Executes when user clicks one of the oauth signin buttons
   */
  public oauthSignin = (type: string) => {
    this.userService
      .authenticateOauth(this.doc, type)
      .then(data => this.handleSuccessfulOauth(data))
      .catch(error => this.handleHttpError(error, 'oauth'));
  }

  /**
   * Handles successful email signup
   */
  private handleSuccessfulEmailSignup = (data: SignupResponse) => {

  }

  /**
   * Handles successful oauth registration / signup
   */
  private handleSuccessfulOauth = (data: SignupResponse) => {

  }

  /**
   * Custom function to handle response errors relating to registration / oauth signin
   */
  private handleHttpError = (error: Error, type: 'email' | 'oauth') => {
    console.error(`Error registering via ${ type }`);
    throw error;
  }
}

