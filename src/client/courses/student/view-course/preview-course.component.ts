// External Dependencies
import { Component, OnInit, Input } from '@angular/core';
import { Document } from 'mongoose';

// AOM Dependencies
import { ErrorService } from 'client/core/error.service';
import { ApiService } from 'client/core/api/api.service';
import { courseSchema, Course } from 'server/dependencies/models/course/course';
import { userSchema } from 'server/dependencies/models/user';

// Interfaces
import { StripeCard } from 'server/api/auth/models';

@Component({
  selector: 'preview-course',
  templateUrl: './preview-course.component.jade'
})

export class PreviewCourseComponent implements OnInit {
  @Input() course: any;

  doc: Course;
  instructors: any[];
  state: { addingCard: boolean } = { addingCard: false };
  cards: StripeCard[];
  
  constructor(
    private apiService: ApiService,
    private errorService: ErrorService
  ) {
  }

  ngOnInit() {
    this.instructors = this.course.instructors.map(user => new mongoose.Document(user, userSchema));
    this.doc = new mongoose.Document(this.course, courseSchema);
  }

  openSubscribeModal = () => {
    $('#subscribe-modal').modal();
    this.apiService.auth.getCreditCards()
      .subscribe(
        data => {
          this.cards = data.cards;
          console.log(this.cards);
        },
        error => this.handleHttpError(error)
      );
  }

  addCreditCard = () => {
    this.state.addingCard = true;
  }

  onSubmitCard = (payload) => {
    if (payload.data.error) {
      (<any>window).Materialize.toast(payload.data.error.message, 4000);
    } else {
      const { data: { token } } = payload;
      this.apiService.students
        .subscribeToCourse({ courseId: this.course._id, cardDetails: token.token })
        .subscribe(
          data => console.log(data),
          error => this.handleHttpError(error)
        )
    }
  };

  handleHttpError = (error: Error) => {
    this.errorService.handleHttpError(error);
  };
}
