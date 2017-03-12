// External Deps
import { Component, OnInit } from '@angular/core';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.jade'
})


export default class ProfileComponent implements OnInit { 
  constructor(private viewState: ViewReadyService) {}

  ngOnInit() {
    this.viewState.emitFinished();
  }
}