import { Schema, Document } from 'mongoose';

type mongoId = string | Schema.Types.ObjectId;
type role = 'instructor' | 'admin' | 'super-admin';

export interface IUser extends Document {
  status: string;

  internal: {
    password?: Schema.Types.ObjectId;
    machines?: string[]
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

    courses: {
      active: {
        course: mongoId;
        lastCompleted: string;
      }[];
      completed: mongoId[];
    };

    roles: string[]
  };

  roles: role[];

  created_at: string;
  updated_at: string;
  
  // Methods
  isActivelySubscribedToCourse: ({ id }: { id: mongoId }) => boolean;
  wasEverSubscribedToCourse: ({ id }: { id: mongoId }) => boolean;

  fullName(): string;
  email(): string
  firstName(): string;
}