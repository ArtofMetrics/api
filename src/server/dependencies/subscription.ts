// External Dependencies

// AOM Dependencies
import { Course } from './models/course/course';
import { IUser } from './models/user/user.model';

// AOM interfaces

//
export class SubscriptionService {
  private DEFAULT_CURRENCY = `usd`;

  constructor(
    private $stripe) { }

  public createSubscriptionPayment = async ({ course, token, user, customer }: { course: Course, token: string, user: IUser, customer }): Promise<any> => {
    const payment = await this.$stripe.charges.create(
      {
        currency: course.subscription.currency || this.DEFAULT_CURRENCY,
        amount: course.subscription.costCents,
        source: token,
        description: `Subscription payment for ${user.email()} charged`,
        customer: user.stripeId
      });

    return payment;
  }
}

export function createSubscriptionService($stripe) {
  return new SubscriptionService($stripe);
}
