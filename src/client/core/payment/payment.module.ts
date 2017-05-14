// External Dependencies
import { NgModule } from '@angular/core';

// AOM Dependencies
import { AddCreditCardFormComponent } from './add-credit-card-form.component';
import { StripeService } from './stripe.service';

// AOM interfaces

@NgModule({
  declarations: [AddCreditCardFormComponent],
  exports: [AddCreditCardFormComponent],
  providers: [StripeService]
})

export class PaymentModule {}