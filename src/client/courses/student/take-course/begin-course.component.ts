// External Dependencies
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

// AOM Dependencies
import { ApiService } from 'client/core/api/api.service';
import { ErrorService } from 'client/core/error.service';

// AOM interfaces
import { StudentCourse } from 'server/dependencies/models/course/student-course';
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
  startCourse: EventEmitter<{ activeLanguage: string }> = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private errorService: ErrorService
  ) { }

  sendStartCourse = () => this.startCourse.emit({ activeLanguage: this.studentCourse.get('data.activeLanguage') });

  setActiveLanguage = ({ language }: { language: string }) => {
    this.apiService.students
      .changeActiveLanguage({ course: this.studentCourse, language })
      .subscribe(
      data => this.studentCourse.set('data.activeLanguage', language),
      error => this.handleHttpError(error)
      );

  }

  handleHttpError = (error: Error) => {
    this.errorService.handleHttpError(error);
  }
}
