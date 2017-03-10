// NPM Deps
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ViewReadyService } from 'client/shared//view-ready.service';

// AOM Deps

@Component({
  selector: 'register',
  templateUrl: './register.component.jade'
})

export class RegisterComponent implements OnInit {
  doc: any;

  constructor(private viewState: ViewReadyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.viewState.emitFinished();
  }

  onRegister = (user) => {
    this.router.navigate(['/']);
  }

}