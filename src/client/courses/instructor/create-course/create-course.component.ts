// External Deps
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.jade'
})

export class CreateCourseComponent implements OnInit {
  constructor(
    private viewState: ViewReadyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.viewState.emitFinished();
  }

  onCreate(data: { course: any }) {
    this.router.navigate(['course', data.course.slug, 'edit'])
  }
}