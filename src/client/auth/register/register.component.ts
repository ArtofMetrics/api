// NPM Deps
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewReadyService } from 'client/shared//view-ready.service';

// AOM Deps

@Component({
  selector: 'register',
  templateUrl: './register.component.jade'
})

export class RegisterComponent implements OnInit {
  doc: any;

  constructor(private viewState: ViewReadyService
              ) { }

  ngOnInit() {
    this.viewState.emitFinished();
  }


}