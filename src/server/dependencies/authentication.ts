// NPM Deps
import * as emailValidator from 'email-validator';
import * as status from 'http-status';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jwt-simple';
import { Schema } from 'mongoose';

// AOM Deps
import { CustomErrorService } from './custom-error.service';

export class AuthenticationService {
  constructor(private $customError: CustomErrorService, 
              private $User, 
              private $config,
              private $Password) { }

  public validateEmail = async (email: string): Promise<void> => {
    try {
      console.log('validating')
      emailValidator.validate(email);
    } catch (error) {
      console.log('NOT VALID')
      this.$customError.defaultError({
        error: `Invalid email ${ email }: ${ error }`,
        readableError: `${ email } is an invalid email`,
        code: status.BAD_REQUEST
      });
    }

    console.log('checking dupe')
    const duplicate = await this.$User.count({ 'profile.email': email });
    console.log('duplicate?')
    if (duplicate) {
      console.log('nope')
      this.$customError.defaultError({
        error: `Email is already in use by another user`,
        readableError: `Another user with this email already exists in our system`,
        code: status.BAD_REQUEST
      });
    }
  }

  public validatePassword = async (password: string, confirmPassword: string) => {
    const self = this;
    if (password !== confirmPassword) {
      return self.$customError.defaultError({
        error: `password and confirmPassword not equal`,
        readableError: `Password and confirmation password do not match`,
        code: status.BAD_REQUEST
      });
    }

    if (password.length < 6) {
      return self.$customError.defaultError({
        error: `Password must be at least 6 characters long`,
        readableError: `Password must be at least 6 characters long`,
        code: status.BAD_REQUEST
      });
    }
  }

  public createPassword = async (password: string): Promise<Schema.Types.ObjectId> => {
    const self = this;
    const hash = await bcrypt.hash(password, 8);
    const pass = await self.$Password.create({ hash });

    return pass._id;
  }

  public sanitizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
  }

  public encodeToken = (doc: any): string => {
    return jwt.encode(doc, this.$config.jwt.secret);
  }
}