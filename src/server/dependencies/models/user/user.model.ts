import { Schema, Document } from 'mongoose';

type mongoId = string & Schema.Types.ObjectId;
export type Role = 'instructor' | 'admin' | 'super-admin';

export interface IUser extends Document {
  status: string;

  internal: {
    password?: Schema.Types.ObjectId;
    machines?: string[],
    stripeId?: string;
  };

  profile: {
    email: string;

    name: {
      first: string;
      last: string;
    };

    education: {
      kind: string;
      institution: string;
    };

    location: {
      city: string;
      country: string;
      zipcode: string;
    };
  };

  courses: {
    active: mongoId[];
    completed: mongoId[];
  };

  roles: Role[];

  created_at: Date;
  updated_at: Date;

  // Getters
  readonly stripeId: string;

  // Methods
  isActivelySubscribedToCourse: ({ id }: { id: mongoId }) => boolean;
  wasEverSubscribedToCourse: ({ id }: { id: mongoId }) => boolean;

  fullName(): string;
  email(): string
  firstName(): string;
}
