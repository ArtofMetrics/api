// External Dependencies
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

// AOm Dependencies
import { ApiService } from 'client/core/api/api.service';
import { ErrorService } from 'client/core/error.service';
import { SidebarStateService } from 'client/sidebar/sidebar-state.service';

// AOM Interfaces
import { CourseModule } from 'server/dependencies/models/module';
import { StudentCourse, studentCourseSchema } from 'server/dependencies/models/course/student-course';
import { Lesson } from 'server/dependencies/models/module/lesson';

@Component({
  selector: 'continue-course',
  templateUrl: './continue-course.component.jade'
})

export class ContinueCourseComponent implements OnInit, OnDestroy {
  @Input()
  studentCourse: StudentCourse;

  activeModule: CourseModule;
  language: string;
  subscriptions: {
    lesson?: Subscription
  } = {};

  constructor(
    private apiService: ApiService,
    private errorService: ErrorService,
    private sidebar: SidebarStateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sidebar.registerCourseWatch(this.studentCourse);
    this.subscriptions.lesson = this.sidebar.lessonWatch
      .subscribe(
        (lesson: Lesson) => {
          console.log('on switch lesson', lesson);
        },
        error => this.errorService.logError(error)
      )
    this.language = this.studentCourse.data.activeLanguage;
    this.setActiveModule({ language: this.language });

  }

  ngOnDestroy() {
    this.subscriptions.lesson.unsubscribe();
    this.sidebar.deregisterCourseWatch();
  }

  setLanguage = ({ language }: { language: string }) => {
    this.language = language;
    this.setActiveModule({ language: this.language });
  };

  setActiveModule = ({ language }: { language: string }) => {
    this.activeModule = this.studentCourse.getActiveModule({ language });
    this.sidebar.setCourse({ course: this.studentCourse });
  };

  continueOn = () => {
    this.apiService.students.submitDrip({
      courseId: this.studentCourse._id,
      language: this.language,
      completed: this.studentCourse.get(`data.lastCompleted.${ this.language }`)
    })
    .subscribe(
      data => {
        this.studentCourse = new mongoose.Document(data.studentCourse, studentCourseSchema);
        if (this.studentCourse.isCompleted) {
          return this.router.navigate(['course', this.studentCourse.slug, 'finish']);
        }

        this.setActiveModule({ language: this.studentCourse.data.activeLanguage });
      },
      error => this.handleHttpError(error)
    )
  }

  handleHttpError = (error: Error) => {
    this.errorService.handleHttpError(error);
  }
}
