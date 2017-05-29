// External Dependencies
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// AOM Dependencies
import { ViewReadyService } from 'client/shared/view-ready.service';
import { ApiService } from 'client/core/api/api.service';
import { ErrorService } from 'client/core/error.service';

// AOM interfaces
import { StudentCourse } from 'server/dependencies/models/course/student-course';

@Component({
  selector: 'finish-course',
  templateUrl: './finish-course.component.jade'
})

export class FinishCourseComponent implements OnInit {
  studentCourse: StudentCourse;

  constructor(
    private viewState: ViewReadyService,
    private apiService: ApiService,
    private routeParams: ActivatedRoute,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeParams.params
      .subscribe(
        (data: { slug: string }) => {
          this.apiService.students.getCourseBySlug({ slug: data.slug })
            .subscribe(
              data => {
                if (!data.course.isCompleted) {
                  return this.router.navigate(['course', data.course.slug]);
                }

                this.studentCourse = data.course;
                this.viewState.emitFinished();
              },
              error => this.handleHttpError(error)
            );
        },
        error => {
          console.error(error);
        }
      );
  }

  handleHttpError = (error: Error) => {
    this.errorService.handleHttpError(error);
  }

  resetCourse = () => {
    this.apiService.students.resetCourse({ course: this.studentCourse })  
    .subscribe(
      data => {
        this.router.navigate(['course', data.studentCourse.slug]);
      },
      error => this.handleHttpError(error)
    )
  };
}