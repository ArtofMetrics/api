// External Dependencies
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// AOM Dependencies
import { Config } from 'client/core/config';
import { StripeService } from 'client/core/payment/stripe.service';

// AOM interfaces

@Component({
  selector: 'add-credit-card-form',
  templateUrl: './add-credit-card-form.component.jade'
})

export class AddCreditCardFormComponent implements OnInit {
  @Output()
  onSubmitCard: EventEmitter<{ data: any }> = new EventEmitter();
  handler: any;
  elements: any;
  card: any;

  constructor(
    private config: Config,
    private stripeService: StripeService
  ) {}

  ngOnInit() {
    this.elements = this.stripeService.stripe.elements();
    this.card = this.elements.create('card');
    this.card.mount('#card-element');
  }

  submitCard = (event) => {
    event.preventDefault();
    this.stripeService.stripe.createToken(this.card)
      .then(token => this.onSubmitCard.emit({ data }))
      .catch(error => console.error(error));
  }
}