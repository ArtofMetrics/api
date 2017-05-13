// External Dependencies

// AOM Dependencies

// AOM interfaces
import { IUser } from './models/user/user.model';

export class PaymentService {
  constructor(private $stripe) {}

  public createCustomer = async ({ user, source }: { user: IUser, source: string }): Promise<any> => {
    return await this.$stripe.customers.create({
      description: `Customer ${ user.fullName() } with email ${ user.email() }`,
      source,
      email: user.email(),
    });
  };

  public getCustomer = async ({ user }: { user: IUser }) => {
    try {
      const customer = await this.$stripe.customers.retrieve(user.internal.stripeId);
      return customer;
    } catch (error) {
      return null;
    }
  };
}

export function createPaymentService($stripe) {
  return new PaymentService($stripe);
}
