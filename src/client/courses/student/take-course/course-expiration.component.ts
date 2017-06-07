// External Dependencies
import { Component, Input } from '@angular/core';

// AOM Dependencies

// AOM Types
import { StudentCourse } from 'server/dependencies/models/course/student-course';

@Component({
  selector: 'course-expiration',
  templateUrl: './course-expiration.component.jade',
  styleUrls: ['./course-expiration.component.styl']
})

export class CourseExpirationComponent {
  @Input()
  studentCourse: StudentCourse;

}