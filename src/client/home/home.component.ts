import { Component, OnInit } from '@angular/core';
import { ViewReadyService } from 'client/shared/view-ready.service';

@Component({
  selector: 'home',
  templateUrl: './home.jade',
  styleUrls: ['./home.styl']
})

export class HomeComponent implements OnInit {

  constructor(private viewState: ViewReadyService) { }
  ngOnInit() {
    this.viewState.emitFinished();
  }
}