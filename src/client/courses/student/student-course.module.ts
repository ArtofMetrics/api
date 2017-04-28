// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// AOM Dependencies
import { PreviewCourseComponent, SubscribeModalComponent } from './view-course';
import { PaymentModule } from 'client/core/payment/payment.module';

@NgModule({
  imports: [CommonModule, PaymentModule],
  declarations: [PreviewCourseComponent, SubscribeModalComponent],
  exports: [PreviewCourseComponent]
})

export class StudentCourseModule { }