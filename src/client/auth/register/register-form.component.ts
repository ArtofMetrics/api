// NPM Deps
import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';

// AOM Deps
import { userSchema } from 'server/dependencies/models/user';
import { ApiService } from 'client/core/api/api.service';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.jade',
  styleUrls: ['./register-form.component.styl']
})

export class RegisterFormComponent implements OnInit {
  doc: any;
  password: string;
  confirmPassword: string;
  
  constructor(private apiService: ApiService, private userService: UserService) {
    console.log(apiService);
   }

  ngOnInit() {
    this.doc = new mongoose.Document({}, userSchema);
  }

  onSubmit(ev, form: NgForm) {
   
  }
}

