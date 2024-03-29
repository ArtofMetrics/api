// External Dependencies
import { Model } from 'mongoose';
// AOM Dependencies

// AOM interfaces
import { IUser } from './models/user/user.model';

export class PaymentService {
  constructor(private $stripe, private $User: Model<any>) {}

  public createCustomer = async ({ user, source }: { user: IUser, source: string }): Promise<{ stripeCustomer: any, updatedUser: IUser }> => {
    const customer = await this.$stripe.customers.create({
      description: `Customer ${ user.fullName() } with email ${ user.email() }`,
      source,
      email: user.email(),
    });

    const updatedUser = await this.$User
      .findByIdAndUpdate(user._id, { 'internal.stripeId': customer.id }, { new: true });

    return { stripeCustomer: customer, updatedUser }; 
  };

  public updateCustomerSource = async ({ user, newSource }: { user: IUser, newSource: string }): Promise<any> => {
    return await this.$stripe.customers.update(user.stripeId, {
      source: newSource
    });
  };

  public getCustomer = async ({ user }: { user: IUser }): Promise<any> => {
    try {
      const customer = await this.$stripe.customers.retrieve(user.stripeId);
      return customer;
    } catch (error) {
      return null;
    }
  };
}

export function createPaymentService($stripe, $User) {
  return new PaymentService($stripe, $User);
}
