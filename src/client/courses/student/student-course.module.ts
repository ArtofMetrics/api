// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// AOM Dependencies
import { SharedCourseModule } from '../shared/shared.module';
import { PreviewCourseComponent, SubscribeModalComponent } from './view-course';
import { PaymentModule } from 'client/core/payment/payment.module';
import { TakeCourseModule } from './take-course/take-course.module';

@NgModule({
  imports: [CommonModule, PaymentModule, SharedCourseModule, FormsModule],
  declarations: [PreviewCourseComponent, SubscribeModalComponent],
  exports: [PreviewCourseComponent, TakeCourseModule]
})

export class StudentCourseModule { }