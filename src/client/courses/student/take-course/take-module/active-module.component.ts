// External Dependencies
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

// AOM Dependencies

// AOM Interfaces
import { StudentCourse } from 'server/dependencies/models/course/student-course';
import { CourseModule } from 'server/dependencies/models/module';
import { Lesson } from 'server/dependencies/models/module/lesson';
import { Drip } from 'server/dependencies/models/module/drip';

@Component({
  selector: 'active-module',
  templateUrl: './active-module.component.jade',
  styleUrls: ['./active-module.component.styl']
})

export class ActiveModuleComponent implements OnChanges {
  @Input()
  module: CourseModule;

  @Input()
  studentCourse: StudentCourse;

  @Output()
  continueOn: EventEmitter<any> = new EventEmitter();

  subscriptions: {
    retake?: Subscription
  } = {}
  retakeLesson: number;
  activeLesson: Lesson;
  activeDrip: Drip;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const language = this.studentCourse.get(`data.activeLanguage`);

    this.subscriptions.retake = this.activatedRoute.queryParams.subscribe((params: { retakeLesson: number}) => {
      if (params.retakeLesson > -1) {
        this.retakeLesson = params.retakeLesson;
      }
    });

    if (this.retakeLesson > -1) {
      this.activeLesson = this.module.lessons[this.retakeLesson];
      this.activeDrip = this.activeLesson.get(`drips.0`);
    } else {
      this.activeLesson = this.studentCourse
        .getActiveLesson({ language });
      this.activeDrip = this.studentCourse
        .getActiveDrip({ language });
    }
  }

  ngOnChanges(changes: any) {
    const studentCourse = changes.studentCourse.currentValue || this.studentCourse;

    if (!studentCourse) {
      return;
    }

    const language = studentCourse.get('data.activeLanguage');
    const previousActiveLesson = this.activeLesson;

    if (this.retakeLesson > -1) {
      this.activeLesson = this.module.lessons[this.retakeLesson];
      this.activeDrip = this.activeLesson.get(`drips.0`);
    } else {
      this.activeLesson = this.studentCourse
        .getActiveLesson({ language });
      this.activeDrip = this.studentCourse
        .getActiveDrip({ language });
    }

    // this.activeLesson = studentCourse.getActiveLesson({ language });
    // this.activeDrip = studentCourse.getActiveDrip({ language });

    if (previousActiveLesson && previousActiveLesson._id.toString() !== this.activeLesson._id.toString()) {
      this.scrollToTop();
    }
  }

  scrollToTop = () => $('html, body').animate({ 'scrollTop': 0 }, '1000');

  nextDrip = () => {
    this.continueOn.emit();
  }

  isActiveDrip = (drip: Drip) => {
    if (!this.studentCourse || !this.activeDrip) {
      return false;
    }

    return this.activeDrip._id.toString() === drip._id.toString();
  }
}
