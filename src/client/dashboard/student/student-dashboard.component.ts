// External Deps
import { Component, OnInit, Input } from '@angular/core';

// AOM Deps
import { ApiService } from 'client/core/api/api.service';
import { ErrorService } from 'client/core/error.service';

// AOM Types
import { StudentCourse, studentCourseSchema } from 'server/dependencies/models/course/student-course';

@Component({
  selector: 'student-dashboard',
  templateUrl: './student-dashboard.component.jade'
})

export class StudentDashboardComponent implements OnInit {
  @Input()
  student: any;

  subscribedCourses: StudentCourse[] = [];
  completedCourses: StudentCourse[] = [];
  
  constructor(
    private apiService: ApiService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.apiService.students.getSubscribedCourses()
      .subscribe(
        data => {
          this.subscribedCourses = data.courses
            .filter(course => !course.isCompleted)
            .map(course => new mongoose.Document(course, studentCourseSchema));
          this.completedCourses = data.courses
            .filter(course => course.isCompleted)
            .map(course => new mongoose.Document(course, studentCourseSchema));
        },
        error => this.handleHttpError(error)
      );
  }

  handleHttpError = (error: Error) => {
    this.errorService.handleHttpError(error);
  };
}