export interface RequestUser {
  _id: string;

  profile: { email: string, name: { first: string, last: string } };

  roles: string[];
}
