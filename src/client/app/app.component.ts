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
    // we never need to unsubscribe from this because the app component is always alive
    this.userService.state$.subscribe(
      (val: string) => {
        this.isLoggedIn = val === 'LOGGED_IN'
      },
      (error: Error) => console.error(`error in state subscribe`, error)
    );

    this.userService
      .load();
  };
}