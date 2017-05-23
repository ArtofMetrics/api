// External Dependencies
import { Component, Input, OnInit } from '@angular/core';

// AOm Dependencies

// AOM Interfaces

@Component({
  selector: 'continue-course',
  templateUrl: './continue-course.component.jade'
})

export class ContinueCourseComponent {
  @Input()
  studentCourse: any;

  constructor() {}
}
