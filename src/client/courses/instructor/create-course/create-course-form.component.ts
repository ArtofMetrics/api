// External Deps
import { Component, OnInit } from '@angular/core';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { ApiService } from 'client/core/api/api.service';

@Component({
  selector: 'create-course-form',
  templateUrl: './create-course-form.component.jade',
  styleUrls: ['./create-course-form.component.styl']
})

export class CreateCourseFormComponent implements OnInit {
  course: any;
  constructor(
    private viewState: ViewReadyService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.course = {
      data: { name: '' }
    }
    this.viewState.emitFinished();
  }

  createCourse = () => {
    return this.apiService.courses.createCourse({ course: this.course });
  };
}