// External Dependencies

// AOM Dependencies


// AOM interfaces
import { Course } from './models/course/course';
import { IUser } from './models/user/user.model';
import { Coupon } from './models/coupon';

//
export class SubscriptionService {
  private DEFAULT_CURRENCY = `usd`;

  constructor(
    private $stripe) { }

  public createSubscriptionPayment = async ({ course, token, user, customer, length, coupon }: { course: Course, token: string, user: IUser, customer, length: string, coupon?: Coupon }): Promise<any> => {

    const lengthType = {
      semester: `semesterCostCents`,
      annual: `annualCostCents`
    }[length];

    const courseCost = course.subscription[lengthType];

    const amountToCharge = coupon ? courseCost - (courseCost * coupon.discount) : courseCost;
    const payment = await this.$stripe.charges.create(
      {
        currency: course.subscription.currency || this.DEFAULT_CURRENCY,
        amount: amountToCharge,
        description: `Subscription payment for ${user.email()} charged`,
        customer: user.stripeId
      });

    return payment;
  }
}

export function createSubscriptionService($stripe) {
  return new SubscriptionService($stripe);
}
