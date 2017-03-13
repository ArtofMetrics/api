// External Deps
import { Component, OnInit } from '@angular/core';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.jade'
})

export class CreateCourseComponent implements OnInit {
  constructor(
    private viewState: ViewReadyService
  ) {}

  ngOnInit() {
    this.viewState.emitFinished();
  }
}