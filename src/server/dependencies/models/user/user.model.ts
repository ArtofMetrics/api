import { SchemaTypes } from 'mongoose';

export interface IUser {
  status: string;

  internal: {
    password: SchemaTypes.ObjectId;  
  };

  profile: {
    email: string;

    name: {
      first: string;
      last: string;
    };
  };

  role: string;
  
  created_at: string;
  updated_at: string;
  
  // Methods
  fullName(): string;
  email(): string
  firstName(): string;
}