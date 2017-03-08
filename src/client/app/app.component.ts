import { Component, OnInit } from '@angular/core';
import { ViewReadyService } from 'client/shared/view-ready.service';
import { UserService } from 'client/core/user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.jade',
  styleUrls: ['./app.component.styl']
})

export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  _opened = false;
  
  applicationTitle = 'Art of Metrics';
  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log('loading')
    this.userService.load()
      .subscribe(
        () => {
          this.isLoggedIn = this.userService.isLoggedIn();
        },
        error => console.error(error));
  };
}