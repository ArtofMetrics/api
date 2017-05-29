// External Dependencies
import { Component, OnInit } from '@angular/core';

// AOM Dependencies
import { ViewReadyService } from 'client/shared/view-ready.service';

// AOM interfaces

@Component({
  selector: 'finish-course',
  templateUrl: './finish-course.component.jade'
})

export class FinishCourseComponent implements OnInit {
  constructor(
    private viewState: ViewReadyService
  ) {}

  ngOnInit() {
    this.viewState.emitFinished();
  }
}