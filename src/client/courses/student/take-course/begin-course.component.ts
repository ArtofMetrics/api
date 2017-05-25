// External Dependencies
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

// AOM Dependencies
import { ApiService } from 'client/core/api/api.service';

// AOM interfaces
import { StudentCourse} from 'server/dependencies/models/course/student-course';
import { IUser } from 'server/dependencies/models/user/user.model';

@Component({
  selector: 'begin-course',
  templateUrl: './begin-course.component.jade'
})

export class BeginCourseComponent {
  @Input()
  studentCourse: StudentCourse;

  @Input()
  instructors: IUser[];

  @Output()
  startCourse: EventEmitter<any> = new EventEmitter();

  constructor(
    private apiService: ApiService
  ) {}

  sendStartCourse = () => this.startCourse.emit();
}
