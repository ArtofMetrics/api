// External Dependencies
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// AOM Dependencies
import { Config } from 'client/core/config';

// AOM interfaces

@Component({
  selector: 'add-credit-card-form',
  templateUrl: './add-credit-card-form.component.jade'
})

export class AddCreditCardFormComponent implements OnInit {
  @Output()
  onFormInit: EventEmitter<any> = new EventEmitter();
  handler: any;

  constructor(
    private config: Config,
  ) {}

  ngOnInit() {
    this.handler = (window as any).StripeCheckout.configure({
      key: (<any>this.config).stripe.apiKey,
      locale: 'auto',
      token: function (token: any) {
        console.log('token', token);

        this.onFormInit(this.handler);

        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });
  }
}