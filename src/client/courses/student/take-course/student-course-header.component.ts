// External Dependencies
import { Component, Input } from '@angular/core';

// AOM Dependencies

// AOM interfaces
import { StudentCourse } from 'server/dependencies/models/course/student-course';

@Component({
  selector: 'student-course-header',
  templateUrl: './student-course-header.component.jade'
})

export class StudentCourseHeaderComponent {
  @Input()
  studentCourse: StudentCourse;

  
}
