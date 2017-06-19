// External Dependencies
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

// AOm Dependencies
import { ApiService } from 'client/core/api/api.service';
import { ErrorService } from 'client/core/error.service';
import { SidebarStateService } from 'client/sidebar/sidebar-state.service';
import { ToastService } from 'client/core/toast.service';

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
  retakeModule?: number;
  retakeLesson?: number;

  activeModule: CourseModule;
  language: string;
  subscriptions: {
    lesson?: Subscription,
    url?: Subscription
  } = {};

  constructor(
    private apiService: ApiService,
    private errorService: ErrorService,
    private sidebar: SidebarStateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.sidebar.registerCourseWatch(this.studentCourse);
    this.subscriptions.lesson = this.sidebar.lessonWatch
      .subscribe(
        (lesson: Lesson) => {
          console.log('on switch lesson', lesson);
        },
        error => this.errorService.logError(error)
      );
    
    this.subscriptions.url = this.activatedRoute
      .queryParams
      .subscribe((params: { retakeModule: number, retakeLesson: number }) => {
        console.log('subscribed');
        this.retakeModule = params.retakeModule;
        this.retakeLesson = params.retakeLesson;
      });
    
    this.language = this.studentCourse.data.activeLanguage;
    this.setActiveModule({ language: this.language });
  }

  ngOnDestroy() {
    this.subscriptions.lesson.unsubscribe();
    this.sidebar.deregisterCourseWatch();
  }

  setLanguage = ({ language }: { language: string }) => {
    this.apiService.students.changeActiveLanguage({ course: this.studentCourse, language })
      .subscribe(
        data => {
          this.studentCourse = new mongoose.Document(data.studentCourse, studentCourseSchema);
          this.language = language;
          this.setActiveModule({ language: this.language });
        },
        error => {
          this.toastService.toast(`Oops, there was an error changing the language to ${ language }`);
          this.handleHttpError(error);
        }
      )
  };

  setActiveModule = ({ language }: { language: string }) => {
    if (this.retakeModule > -1 && this.retakeLesson > -1) {
      console.log('the retake module', this.retakeModule);
      console.log('the retake lesson', this.retakeLesson);
      this.activeModule = this.studentCourse
        .get(`data.modules.${ this.studentCourse.data.activeLanguage }.${ this.retakeModule }`);
    } else {
      this.activeModule = this.studentCourse.getActiveModule({ language });
      this.sidebar.setCourse({ course: this.studentCourse });
    }
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
    );
  }

  handleHttpError = (error: Error) => {
    this.errorService.handleHttpError(error);
  }
}
