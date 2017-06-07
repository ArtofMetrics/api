// External Dependencies
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// AOM Dependencies
import { Course } from 'server/dependencies/models/course/course';

// AOM Types

@Component({
  selector: 'toggle-course-visibility',
  templateUrl: './toggle-course-visibility.component.jade'
})

export class ToggleCourseVisibilityComponent implements OnInit {

  @Input()
  course: Course;

  @Output()
  toggleVisibility: EventEmitter<boolean> = new EventEmitter();

  isVisible: boolean;
  
  constructor(

  ) { }

  ngOnInit() {
    console.log(this.course);
    this.isVisible = this.course.isVisible;
  }

  toggle = () => {
    this.toggleVisibility.emit(!this.isVisible);
  };
}