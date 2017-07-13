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
  activeLesson: Lesson;
  language: string;
  subscriptions: {
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

    this.language = this.studentCourse.data.activeLanguage;

    this.subscriptions.url = this.activatedRoute
      .queryParams
      .subscribe((params: { module: number, lesson: number, drip: number }) => {
        const language = this.studentCourse.get(`data.activeLanguage`);
        this.activeModule = this.studentCourse.get(`data.modules.${language}.${params.module}`);
        console.log(this.activeModule)
        // this.activeLesson = this.activeModule.lessons[params.lesson];

        this.setSidebarCourse({ language });
      });
  }

  ngOnDestroy() {
    this.sidebar.deregisterCourseWatch();
  }

  setLanguage = ({ language }: { language: string }) => {
    this.apiService.students.changeActiveLanguage({ course: this.studentCourse, language })
      .subscribe(
      data => {
        this.studentCourse = new mongoose.Document(data.studentCourse, studentCourseSchema);
        this.language = language;
        this.setSidebarCourse({ language: this.language });
      },
      error => {
        this.toastService.toast(`Oops, there was an error changing the language to ${language}`);
        this.handleHttpError(error);
      }
      )
  };

  setSidebarCourse = ({ language }: { language: string }) => {
    this.sidebar.setCourse({ course: this.studentCourse });
  };

  continueOn = () => {
    this.apiService.students.submitDrip({
      courseId: this.studentCourse._id,
      language: this.language,
      completed: this.studentCourse.get(`data.lastCompleted.${this.language}`)
    })
      .subscribe(
      data => {
        const language = this.studentCourse.data.activeLanguage;
        this.studentCourse = new mongoose.Document(data.studentCourse, studentCourseSchema);
         
        if (this.studentCourse.isCompleted) {
          return this.router.navigate(['course', this.studentCourse.slug, 'finish']);
        }
        
        this.router.navigate([], { queryParams: this.studentCourse.parseLastCompleted({ language }) });
      },
      error => this.handleHttpError(error)
      );
  }

  navigateToDrip = ({ module, lesson, drip }: { module?: number, lesson?: number, drip?: number }) => {
    this.router.navigate([], {
      queryParams: { module, lesson, drip }
    });
  };

  handleHttpError = (error: Error) => {
    this.errorService.handleHttpError(error);
  }
}
