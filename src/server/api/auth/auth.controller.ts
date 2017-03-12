// NPM Dependencies
import * as express from 'express';
import * as _ from 'lodash';
import * as status from 'http-status';
import * as bcrypt from 'bcrypt';

// AOM Deps
import { Config } from '../../dependencies/config';
import { CustomErrorService } from '../../dependencies/custom-error.service';
import { AuthenticationService } from '../../dependencies/authentication';

// AOM Models
import { AuthenticatedRequest } from '../interfaces/authenticated-request.model';
import { RegistrationParams } from 'shared/interfaces/user-registration.model';
import { HTTPResponse } from '../models';
import { 
  LoginEmailRequestBody, 
  LoginEmailResponse, 
  RegistrationEmailRequestBody, 
  RegistrationEmailResponse } from './models';

// Constants
const CLIENT_USER_FIELDS = ['_id', 'profile', 'role', 'status'];

export class AuthController {

  public getMe($User, $customError: CustomErrorService) {
    return async (req: AuthenticatedRequest, res: express.Response) => {
      try {
        if (req.user) {
          const user = await $User.findById(req.user._id);
          if (!user) {
            return res.json({ data: { user: null } });
          }
          const clientUser = _.pick(user, CLIENT_USER_FIELDS);
          return res.json({ data: { user: clientUser } });
        } else {
          res.json({ data: { user: null } });
        }
      } catch (error) {
        return $customError.httpError(res)(error);
      }
    }
  }

  public loginEmail(
    $customError: CustomErrorService,
    $authentication: AuthenticationService,
    $User,
    $Password
  ) {
    return async (req: LoginEmailRequestBody, res: express.Response) => {
      try {
        if (!req.body.email) {
          $customError.defaultError({
            readableError: `Please enter an email to login with`,
            error: `Email is undefined`,
            code: status.BAD_REQUEST
          });
        }

        if (!req.body.password) {
          $customError.defaultError({
            readableError: `Please enter a password to login with`,
            error: `Password is undefined`,
            code: status.BAD_REQUEST
          });
        }

        const user = await $User
          .findOne({ 'profile.email': req.body.email.trim().toLowerCase() })
          .setOptions({ select: CLIENT_USER_FIELDS.concat(['internal']).join(' ') });

        if (!user) {
          $customError.defaultError({
            readableError: `No user with that email exists!`,
            error: `User with email ${ req.body.email } not found`,
            code: status.BAD_REQUEST
          });
        }

        const currentPassword = await $Password.findById(user.internal.password);
        if (!currentPassword) {
          $customError.defaultError({
            error: `User has no password set!`,
            readableError: `User ${ user._id } has no password`,
            code: status.BAD_REQUEST
          });
        }

        const test = await bcrypt.compare(req.body.password, currentPassword.hash);
        if (!test) {
          $customError.defaultError({
            error: `Password is incorrect`,
            readableError: `Password is incorrect`,
            code: status.BAD_REQUEST
          });
        }

        const doc = user.toObject();
        _.unset(doc, 'internal');

        const token = $authentication.encodeToken(doc);

        const data: LoginEmailResponse = { data: { user: doc, token } };
        return res.json(data);
      } catch (error) {
        return $customError.httpError(res)(error);
      }
    };
  }

  public registerEmail($customError: CustomErrorService,
    $authentication: AuthenticationService,
    $User,
    $Password) {
    return async (req: RegistrationEmailRequestBody, res: express.Response) => {
      const self = this;
      try {
        checkDoc(req.body);
        const sanitizedEmail = $authentication.sanitizeEmail(req.body.doc.profile.email);
        await $authentication.validateEmail(sanitizedEmail);
        $authentication.validatePassword(req.body.password, req.body.confirmPassword);
        const user = new $User({
          roles: [],
          profile: req.body.doc.profile
        });

        const passwordId = await $authentication.createPassword(req.body.password);
        user.set('internal.password', passwordId);

        try {
          await user.save();
        } catch (error) {
          $Password.remove({ _id: passwordId });
          throw error;
        }

        user.set('internal', undefined);

        const doc = user.toObject();
        _.unset(doc, 'internal');
        const token = $authentication.encodeToken(user);

        const responseBody: HTTPResponse<RegistrationEmailResponse> = { data: { user: doc, token } };
        return res.json(responseBody);
      } catch (error) {
        return $customError.httpError(res)(error);
      }

      function checkDoc(requestBody: RegistrationParams) {
        if (!requestBody.doc) {
          $customError.defaultError({
            readableError: `No user document provided to register with via email!`,
            error: `Request body must contain a 'doc' property containing the user registration information`,
            code: status.BAD_REQUEST
          });
        }

        if (!requestBody.doc.profile.email) {
          $customError.defaultError({
            readableError: `Email is required to register user`,
            error: `Email cannot be undefined`,
            code: status.BAD_REQUEST
          });
        }
      }
    }
  }
}