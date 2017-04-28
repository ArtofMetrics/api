// External Dependencies
import { Component, OnInit, Input } from '@angular/core';
import { Document } from 'mongoose';

// AOM Dependencies
import { ApiService } from 'client/core/api/api.service';
import { courseSchema, Course } from 'server/dependencies/models/course/course';
import { userSchema } from 'server/dependencies/models/user';
// Interfaces

@Component({
  selector: 'preview-course',
  templateUrl: './preview-course.component.jade'
})

export class PreviewCourseComponent implements OnInit {
  @Input() course: any;
  doc: Course;
  instructors: any[];

  constructor(
    private apiService: ApiService,
  ) {
  }

  ngOnInit() {
    this.instructors = this.course.instructors.map(user => new mongoose.Document(user, userSchema));
    this.doc = new mongoose.Document(this.course, courseSchema);
  }

  openSubscribeModal = () => {
    $('#subscribe-modal').modal();
  }

  addCreditCard = () => {
  }

  onFormInit = (payload) => {
    console.log(payload);
  }
}