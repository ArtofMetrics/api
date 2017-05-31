// External Deps
import { Component, Input } from '@angular/core';

// AOM Deps

// AOM Types
import { StudentCourse } from 'server/dependencies/models/course/student-course';

@Component({
  selector: 'student-description',
  templateUrl: './student-description.component.jade'
})

export class StudentDescriptionComponent {
  @Input()
  student: any;
}