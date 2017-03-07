import { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  status: string;

  internal: {
    password: Schema.Types.ObjectId;  
  };

  profile: {
    email: string;

    name: {
      first: string;
      last: string;
    };
  };

  roles: string[];

  created_at: string;
  updated_at: string;
  
  // Methods
  fullName(): string;
  email(): string
  firstName(): string;
}