// External Dependencies
import { Component, Input, OnInit } from '@angular/core';

// AOm Dependencies

// AOM Interfaces
import { CourseModule } from 'server/dependencies/models/module';
import { StudentCourse } from 'server/dependencies/models/course/student-course';

@Component({
  selector: 'continue-course',
  templateUrl: './continue-course.component.jade'
})

export class ContinueCourseComponent implements OnInit {
  @Input()
  studentCourse: StudentCourse;
  activeModule: CourseModule;
  language: string;

  constructor() {}

  ngOnInit() {
    const activeModule = this.studentCourse.getActiveModule();
    this.activeModule = this.studentCourse.get(`data.modules.${ this.language }.${ activeModule }`);
  }


}
