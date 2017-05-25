// External Dependencies
import { Component, Input, OnInit } from '@angular/core';

// AOm Dependencies
import { ApiService } from 'client/core/api/api.service';

// AOM Interfaces
import { CourseModule } from 'server/dependencies/models/module';
import { StudentCourse } from 'server/dependencies/models/course/student-course';

@Component({
  selector: 'continue-course',
  templateUrl: './continue-course.component.jade'
})

export class ContinueCourseComponent implements OnInit {
  @Input()
  studentCourse: StudentCourse;
  activeModule: CourseModule;
  language: string;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.language = this.studentCourse.data.activeLanguage;
    this.setActiveModule({ language: this.language });
  }

  setLanguage = ({ language }: { language: string }) => {
    this.language = language;
    this.setActiveModule({ language: this.language });
  };

  setActiveModule = ({ language }: { language: string }) => {
    this.activeModule = this.studentCourse.getActiveModule({ language });
  };

  continueOn = () => {
    
  }
}
