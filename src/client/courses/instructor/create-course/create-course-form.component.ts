// External Deps
import { Component, OnInit } from '@angular/core';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';

@Component({
  selector: 'create-course-form',
  templateUrl: './create-course-form.component.jade',
  styleUrls: ['./create-course-form.component.styl']
})

export class CreateCourseFormComponent implements OnInit {
  course: any;
  constructor(
    private viewState: ViewReadyService
  ) {}

  ngOnInit() {
    this.course = {
      data: { name: '' }
    }
    this.viewState.emitFinished();
  }
}