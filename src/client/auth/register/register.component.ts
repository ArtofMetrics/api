// NPM Deps
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewReadyService } from 'client/shared//view-ready.service';
import { userSchema } from 'server/dependencies/models/user';

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
    this.doc = new mongoose.Document({}, userSchema);
  }


}