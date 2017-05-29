// External Dependencies
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

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

  activeLesson: Lesson;
  activeDrip: Drip;

  constructor() { }

  ngOnInit() {
    const language = this.studentCourse.get(`data.activeLanguage`);

    this.activeLesson = this.studentCourse
      .getActiveLesson({ language });
    this.activeDrip = this.studentCourse
      .getActiveDrip({ language });
  }

  ngOnChanges(changes: any) {
    const studentCourse = changes.studentCourse.currentValue || this.studentCourse;
    
    if (!studentCourse) {
      return;
    }

    const language = studentCourse.get('data.activeLanguage');
    const previousActiveLesson = this.activeLesson;
    this.activeLesson = studentCourse.getActiveLesson({ language });
    this.activeDrip = studentCourse.getActiveDrip({ language });
    
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
