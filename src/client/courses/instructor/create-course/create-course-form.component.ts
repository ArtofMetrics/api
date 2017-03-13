// External Deps
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { ApiService } from 'client/core/api/api.service';

@Component({
  selector: 'create-course-form',
  templateUrl: './create-course-form.component.jade',
  styleUrls: ['./create-course-form.component.styl']
})

export class CreateCourseFormComponent implements OnInit {
  course: { data: { name: string }};
  constructor(
    private viewState: ViewReadyService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.course = {
      data: { name: '' }
    }
    this.viewState.emitFinished();
  }

  createCourse = () => {
    return this.apiService.courses
      .createCourse({ course: this.course })
      .subscribe(
        data => this.router.navigate(['course', data.course._id, 'edit']),
        error => this.handleHttpError(error));
  };

  handleHttpError = (error: Error) => {
    console.error(`Error`, error);
    throw error;
  }
}