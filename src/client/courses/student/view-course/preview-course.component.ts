// External Dependencies
import { Component, OnInit, Input } from '@angular/core';
import { Document } from 'mongoose';
import { Router } from '@angular/router';

// AOM Dependencies
import { ErrorService } from 'client/core/error.service';
import { ApiService } from 'client/core/api/api.service';
import { courseSchema, Course } from 'server/dependencies/models/course/course';
import { userSchema } from 'server/dependencies/models/user';
import { ToastService } from 'client/core/toast.service';

// Interfaces
import { StripeCard } from 'server/api/auth/models';

@Component({
  selector: 'preview-course',
  templateUrl: './preview-course.component.jade',
  styleUrls: ['./preview-course.component.styl']
})

export class PreviewCourseComponent implements OnInit {
  @Input() course: any;

  doc: Course;
  instructors: any[];
  state: { addingCard: boolean } = { addingCard: false };
  cards: StripeCard[];
  subscribing: boolean = false;

  constructor(
    private apiService: ApiService,
    private errorService: ErrorService,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.instructors = this.course.instructors.map(user => new mongoose.Document(user, userSchema));
    this.doc = new mongoose.Document(this.course, courseSchema);
  }

  startPayment = () => {
    if (this.course.isFree()) {
      return this.subscribeToFreeCourse();
    }

    this.subscribing = true;

    this.apiService.auth.getCreditCards()
      .subscribe(
      data => {
        this.cards = data.cards;
      },
      error => this.handleHttpError(error)
      );
  };

  addCreditCard = () => this.state.addingCard = true;

  onSubmitCard = (payload) => {
    if (payload.data.error) {
      (<any>window).Materialize.toast(payload.data.error.message, 4000);
    } else {
      const { data: { token } } = payload;
      this.apiService.students
        .subscribeToCourse({ courseId: this.course._id, cardDetails: token.token })
        .subscribe(
        data => {
          this.state.addingCard = false;
          this.subscribing = false;
          this.onSuccessfulPayment();
        },
        error => this.handleHttpError(error)
        )
    }
  };

  subscribeToFreeCourse = () => {
    this.apiService.students.subscribeToCourse({ courseId: this.course._id })
      .subscribe(
      data => this.onSuccessfulPayment(),
      error => this.handleHttpError(error)
      )
  };

  onSuccessfulPayment = () => {
    this.toastService.toast(`You've successfuly paid for this course!`);
    setTimeout(() => window.location.reload(), 1000);
  }

  handleHttpError = (error: Error) => {
    this.errorService.handleHttpError(error);
  };
}
