// External Dependencies
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  state: 'CONTINUE' | 'BEGIN' | 'RESUBSCRIBE';
  constructor(
    private apiService: ApiService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.instructors = this.course.course
      .instructors
      .map(instructor => new mongoose.Document(instructor, userSchema));
    this.studentCourse = new mongoose.Document(this.course, studentCourseSchema);

    const expired = this.studentCourse.isExpired();

    if (this.studentCourse.data.lastCompleted[this.studentCourse.data.activeLanguage] === '0.0.0' && !expired) {
      this.state = 'BEGIN';
      this.router.navigate([], { queryParams: { module: 0, lesson: 0, drip: 0 } });
    } else if (expired) {
      this.state = 'RESUBSCRIBE';
    } else {
      this.state = 'CONTINUE';
      const language = this.studentCourse.data.activeLanguage;
      this.router.navigate([], {
        queryParams: this.studentCourse.parseLastCompleted({ language })
      });
    }
  }

  
  startCourse = (payload: { activeLanguage: string }) => {
    this.studentCourse.set('data.activeLanguage', payload.activeLanguage);
    this.state = 'CONTINUE';
    const language = this.studentCourse.data.activeLanguage;
      this.router.navigate([], {
        queryParams: this.studentCourse.parseLastCompleted({ language })
      });
  }
}
