// External Dependencies
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

// AOM Dependencies
import { StudentCourse } from 'server/dependencies/models/course/student-course';
import { CourseModule } from 'server/dependencies/models/module';
import { Lesson } from 'server/dependencies/models/module/lesson';
import { Drip } from 'server/dependencies/models/module/drip';

// AOM Types

// Constants
export type ContentType = 'main' | 'course';

@Injectable()
export class SidebarStateService {

  private contentType = new BehaviorSubject<ContentType>('main');
  private courseWatch: BehaviorSubject<StudentCourse | null>;
  public lessonWatch: BehaviorSubject<Lesson | null> = new BehaviorSubject(null);

  private contentView: ContentType = 'main';

  private subscriptions: { contentType?: Subscription, courseWatch?: Subscription } = {};

  public course: StudentCourse;

  public activeModule: CourseModule;
  public activeLesson: Lesson;
  public activeDrip: Drip;
  constructor(

  ) {
    this.subscriptions.contentType = this.contentType.subscribe(
      (type: ContentType) => {
        if (type === 'main') {
          this.setMainView();
        }

        this.contentView = type;
      },
      error => {
        console.error(error);
      }
    );
  }

  public registerCourseWatch = (course: StudentCourse) => {
    if (this.courseWatch) {
      this.deregisterCourseWatch();
    }

    this.courseWatch = new BehaviorSubject(course);
    this.subscriptions.courseWatch = this.courseWatch.subscribe(
      (course: StudentCourse) => {
        this.course = course;
        if (this.contentView !== 'course') {
          this.setContentType({ type: 'course' });
        }

        const language = course.data.activeLanguage;
        this.activeModule = course.getActiveModule({ language })
        this.activeLesson = course.getActiveLesson({ language });
        this.activeDrip = course.getActiveDrip({ language });
      },
      error => {
        console.error(error);
      }
    )
  };

  public deregisterCourseWatch = () => {
    if (this.subscriptions.courseWatch) {
      this.subscriptions.courseWatch.unsubscribe();

    }
  };

  public setMainView = () => {
    this.course = null;
    this.activeModule = null;
    this.activeLesson = null;
    this.activeDrip = null;
  };

  public setContentType = ({ type }: { type: ContentType }) => {
    if (this.contentView !== type) {
      this.contentType.next(type);
    }
  };

  public setCourse = ({ course }: { course: StudentCourse }) => {
    this.courseWatch.next(course);
  };

  public loadLesson = ({ lesson }: { lesson: Lesson }) => {
    this.lessonWatch.next(lesson);
  };
}