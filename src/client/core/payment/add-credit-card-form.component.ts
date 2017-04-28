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
  onFormInit: EventEmitter<any> = new EventEmitter();
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
    // this.handler = stripeService;
  }
}