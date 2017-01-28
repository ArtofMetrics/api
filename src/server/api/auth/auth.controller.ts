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

// Constants
const CLIENT_USER_FIELDS = ['_id', 'profile', 'role', 'status'];

export class AuthController {

  public getMe($User, $customError: CustomErrorService) {
    return async (req: AuthenticatedRequest, res: express.Response) => {
      try {
        if (req.user) {
          const user = await $User.findById(req.user._id);
          if (!user) {
            return res.json({ user: null });
          }
          const clientUser = _.pick(user, CLIENT_USER_FIELDS);
          return res.json({ user: clientUser })
        } else {
          res.json({ user: null })
        }
      } catch (error) {
        return $customError.httpError(res)(error);
      }
    }
  }

  public registerEmail($customError: CustomErrorService, 
                       $authentication: AuthenticationService,
                       $User) {
    return async (req: { body: RegistrationParams }, res: express.Response) => {
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

        await user.save();
        
        user.set('internal', undefined);

        const doc = user.toObject();
        _.unset(doc, 'internal');
        const token = $authentication.encodeToken(user);
        res.json({ user: doc, token });
      } catch (error) {
        console.log("in error", error);
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