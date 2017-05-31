// External Dependencies
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// AOm Dependencies
import { ApiService } from 'client/core/api/api.service';
import { ErrorService } from 'client/core/error.service';
import { studentCourseSchema, StudentCourse} from 'server/dependencies/models/course/student-course';
import { userSchema } from 'server/dependencies/models/user';

// AOM Interfaces
import { IUser } from 'server/dependencies/models/user/user.model';

@Component({
  selector: 'take-course',
  templateUrl: './take-course.component.jade'
})

export class TakeCourseComponent implements OnInit {
  @Input()
  course: any;
  studentCourse: StudentCourse;
  instructors: IUser[];

  state: 'CONTINUE' | 'BEGIN';
  constructor(
    private apiService: ApiService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.instructors = this.course.course
      .instructors
      .map(instructor => new mongoose.Document(instructor, userSchema));
    this.studentCourse = new mongoose.Document(this.course, studentCourseSchema);
   if (this.studentCourse.data.lastCompleted[this.studentCourse.data.activeLanguage] === '0.0.0') {
     this.state = 'BEGIN';
   } else {
     this.state = 'CONTINUE';
   }
  }

  startCourse = (payload: { activeLanguage: string }) => {
    console.log(payload);
    this.studentCourse.set('data.activeLanguage', payload.activeLanguage);
    this.state = 'CONTINUE';
  }
}
