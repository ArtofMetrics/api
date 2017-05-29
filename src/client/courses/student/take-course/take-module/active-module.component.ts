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

  constructor() {}

  ngOnInit() {
    this.activeLesson = this.studentCourse
      .getActiveLesson({ language: this.studentCourse.data.activeLanguage });
  }
  
  ngOnChanges(changes: any) {
    const { studentCourse } = changes.studentCourse.currentValue;
    if (!studentCourse) {
      return;
    }
    
    this.activeLesson = studentCourse.getActiveLesson({ language: studentCourse.data.activeLanguage });
  }

  nextDrip = () => {
    this.continueOn.emit();
  }

  isActiveDrip = (drip: Drip) => {
    if (!this.studentCourse) {
      return false;
    }

    const activeDrip = this.studentCourse.getActiveDrip({ language: this.studentCourse.data.activeLanguage });
    return activeDrip._id.toString() === drip._id.toString();
  }
}
