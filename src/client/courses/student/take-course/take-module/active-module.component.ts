// External Dependencies
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// AOM Dependencies

// AOM Interfaces
import { StudentCourse } from 'server/dependencies/models/course/student-course';
import { CourseModule } from 'server/dependencies/models/module';
import { Lesson } from 'server/dependencies/models/module/lesson';

@Component({
  selector: 'active-module',
  templateUrl: './active-module.component.jade'
})

export class ActiveModuleComponent implements OnInit {
  @Input()
  module: CourseModule;

  @Input()
  studentCourse: StudentCourse;

  @Output()
  continueOn: EventEmitter<any> = new EventEmitter();

  activeLesson: Lesson;
  constructor() {}

  ngOnInit() {
    this.activeLesson = this.studentCourse
      .getActiveLesson({ language: this.studentCourse.data.activeLanguage });
    console.log('active lesson', this.activeLesson);
  }

  nextDrip = () => {
    this.continueOn.emit();
  }
}
