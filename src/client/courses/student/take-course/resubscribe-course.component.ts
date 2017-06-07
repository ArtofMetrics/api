// External Dependencies
import { Component, Input } from '@angular/core';

// AOM Dependencies

// AOM Types
import { StudentCourse } from 'server/dependencies/models/course/student-course';
import { IUser } from 'server/dependencies/models/user/user.model';

@Component({
  selector: 'resubscribe-course',
  templateUrl: './resubscribe-course.component.jade',
  styleUrls: ['./course-expiration.component.styl']
})

export class ResubscribeCourseComponent {
  @Input()
  studentCourse: StudentCourse;
  
  @Input()
  instructors: IUser[];
  
  constructor() {}

  resubscribeToCourse = () => {

  };
}