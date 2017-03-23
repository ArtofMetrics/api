// External Deps
import { Component, Input, ElementRef, OnInit } from '@angular/core';

// AOM Deps
import { InstructorCourseService } from './instructor-course.service';

@Component({
  selector: 'instructor-dashboard',
  templateUrl: './instructor-dashboard.component.jade'
})

export class InstructorDashboardComponent implements OnInit {
  courses: any[];

  @Input()
  instructor: any;

  constructor(
    private instructorCourseService: InstructorCourseService
  ) { }

  ngOnInit() {
    this.instructorCourseService.fetchCourses()
      .subscribe(
        (data) => this.courses = data.courses,
        (error) => this.handleHttpError(error)
      )
  }

  handleHttpError = (error: Error) => {
    console.error(error);
  }
}