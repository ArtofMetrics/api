// External Deps
import { Component, OnInit } from '@angular/core';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { ApiService } from 'client/core/api/api.service';
import { ErrorService } from 'client/core/error.service';
import { UserService } from 'client/core/user.service';

// AOM Types
import { StudentCourse } from 'server/dependencies/models/course/student-course';

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.jade',
  styleUrls: ['./profile.component.styl']
})


export default class ProfileComponent implements OnInit { 
  card: any;

  activeCourses: StudentCourse[];
  completedCourses: StudentCourse[];

  constructor(
    private viewState: ViewReadyService,
    private apiService: ApiService,
    private errorService: ErrorService,
    private userService: UserService) {}

  ngOnInit() {
    
    this.apiService.students.getSubscribedCourses()
      .subscribe(
        data => {
          const courses = data.courses;

          this.activeCourses = courses.filter(course => !course.isCompleted && course.subscription.subscribed);
          this.completedCourses = courses.filter(course => course.isCompleted);
        },
        error => {
          this.handleHttpError(error);
        }
      );
    
    this.apiService.auth.getCreditCards()
      .subscribe(
        data => {
          [this.card] = data.cards;
          this.viewState.emitFinished();
        },
        error => this.handleHttpError(error)
      );
  }

  handleHttpError = (error: Error) => {
    this.errorService.handleHttpError(error);
  }


}