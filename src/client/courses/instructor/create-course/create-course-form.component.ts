// External Deps
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { ApiService } from 'client/core/api/api.service';
import { ErrorService } from 'client/core/error.service';

// AOM Interfaces/Models

@Component({
  selector: 'create-course-form',
  templateUrl: './create-course-form.component.jade',
  styleUrls: ['./create-course-form.component.styl']
})

export class CreateCourseFormComponent implements OnInit {
  @Output()
  onCreateCourse: EventEmitter<any> = new EventEmitter<any>();

  course: { data: { name: string } };
  constructor(
    private viewState: ViewReadyService,
    private apiService: ApiService,
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.course = {
      data: { name: '' }
    }
    this.viewState.emitFinished();
  }

  createCourse = ($event, form: NgForm) => {
    return this.apiService.courses
      .createCourse({ course: this.course })
      .map(data => data.course)
      .subscribe(
        (course) => this.onCreateCourse.emit({ course }),
        (error: Error) => this.errorService.handleHttpError(error)
      );
  };
}