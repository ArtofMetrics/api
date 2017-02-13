// NPM Deps
import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';

// AOM Deps
import { userSchema } from 'server/dependencies/models/user';
import { ApiService } from 'client/core/api/api.service';
import { UserService } from 'client/core/user.service';

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

  onSubmit = (ev, form: NgForm) => {
   this.userService
    .registerEmail({ doc: this.doc, password: this.password, confirmPassword: this.confirmPassword })
    .catch(error => {
      console.error(error);
      throw error;
    })
  }

  oauthSignin = (type: string) => {
    this.userService
      .authenticateOauth({ doc: this.doc, type })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
}

