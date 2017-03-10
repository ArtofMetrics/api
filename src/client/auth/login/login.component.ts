// NPM Deps
import { Component, OnInit } from '@angular/core';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.jade'
})

export class LoginComponent implements OnInit {
  constructor(
    private viewState: ViewReadyService
  ) {}

  ngOnInit() {
    this.viewState.emitFinished();
  }
  
}