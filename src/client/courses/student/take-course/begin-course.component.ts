// External Dependencies
import { Component, OnInit, Input } from '@angular/core';

// AOM Dependencies
import { ApiService } from 'client/core/api/api.service';
import { studentCourseSchema, StudentCourse} from 'server/dependencies/models/course/student-course';
import { userSchema } from 'server/dependencies/models/user';

// AOM interfaces
import { IUser } from 'server/dependencies/models/user/user.model';

@Component({
  selector: 'begin-course',
  templateUrl: './begin-course.component.jade'
})

export class BeginCourseComponent implements OnInit {
  @Input()
  course: any;
  instructors: IUser[];
  studentCourse: StudentCourse;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.instructors = this.course.course
      .instructors
      .map(instructor => new mongoose.Document(instructor, userSchema));
    this.studentCourse = new mongoose.Document(this.course, studentCourseSchema);
  }
}
