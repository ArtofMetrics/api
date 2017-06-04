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
  card: StripeCard;
  subscribing: boolean = false;
  activeLanguage: string;
  selectedCard: StripeCard;

  constructor(
    private apiService: ApiService,
    private errorService: ErrorService,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.instructors = this.course.instructors.map(user => new mongoose.Document(user, userSchema));
    const doc: Course = new mongoose.Document(this.course, courseSchema);
    this.doc = doc;

    this.activeLanguage = this.doc.data.modules.R.length ?
      'R' :
      'STATA';
  }

  startPayment = () => {
    if (this.doc.isFree()) {
      return this.subscribeToFreeCourse();
    }

    this.subscribing = true;

    this.apiService.auth.getCreditCards()
      .subscribe(
      data => {
        [this.card] = data.cards;
      },
      error => this.handleHttpError(error)
      );
  };

  addCreditCard = () => {
    this.state.addingCard = true;
  };

  onSubmitCard = (payload) => {
    if (payload.data.error) {
      (<any>window).Materialize.toast(payload.data.error.message, 4000);
    } else {
      const { data: { token } } = payload;
      this.submitSubscription({ token });
    }
  };

  submitSubscription = ({ token }: { token?: any }) => {
    console.log('selectedCard in submitSubscription', this.selectedCard);
    const cardDetails = this.selectedCard || token.token;

    console.log('cardDetails', cardDetails);
    this.apiService.students
      .subscribeToCourse({ courseId: this.doc._id, cardDetails, language: this.activeLanguage })
      .subscribe(
      data => {
        this.stateCleanup();
        this.onSuccessfulPayment();
      },
      error => this.handleHttpError(error)
      );
  };

  stateCleanup = () => {
    this.selectedCard = null;
    this.state.addingCard = false;
    this.subscribing = false;
  }

  subscribeToFreeCourse = () => {
    this.apiService.students.subscribeToCourse({ courseId: this.doc._id, language: this.activeLanguage })
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

  setActiveLanguage = ({ language }: { language: string }) => {
    this.activeLanguage = language;
  };

  selectExistingCard = (card: StripeCard) => {
    if (this.selectedCard) {
      this.selectedCard = null;
    } else {
      this.selectedCard = card;
    }

    console.log('selectedCard', this.selectedCard);
  };

  isSelectedCard = (card: StripeCard) => {
    return this.selectedCard && this.selectedCard.id === card.id;
  }
}
