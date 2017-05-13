// NPM Deps
import * as jwt from 'jwt-simple';
import { Request, Response, NextFunction } from 'express';
import * as status from 'http-status';
import { Document, Model } from 'mongoose';
import { pick } from 'lodash';

// AOM Deps
import { IUser } from '../../dependencies/models/user/user.model';
import { Config } from '../../dependencies/config';
import { CustomErrorService } from '../../dependencies/custom-error.service';

// AOM models
import { AuthenticatedRequest } from '../interfaces/authenticated-request.model';
import { RequestUser } from '../interfaces/request-user.model';

interface Decoded {
  valid: boolean;
  _id: string;
  profile: {
    name: {
      first: string;
      last: string;
    };
    email: string;
  }

  roles: string[];
}

export class Middleware {
  private $config: Config;
  private $customError: CustomErrorService;
  private $User: Model<any>;

  constructor(di) {
    const self = this;
    di.invoke(function ($config, $customError, $User) {
      self.$config = $config;
      self.$customError = $customError;
      self.$User = di.get('$User');
    });
  }

  public jwtDecoder = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      let decoded: Decoded;
      const token = req.headers.authorization;
      if (token) {
        const secret = this.$config.jwt.secret;
        decoded = this.getDecoded(token, secret);
        if (!decoded) {
          this.$customError.defaultError({
            error: `Decoded token is not valid`,
            readableError: `Could not decode token or token is invalid`,
            code: status.BAD_REQUEST
          });
        }

        req.user = new this.$User(decoded);
      }

      next();
    } catch (error) {
      this.$customError.httpError(res)(error);
    }
  }

  public requireLogin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        this.$customError.defaultError({
          error: `Not logged in`,
          readableError: `You must be logged in for this`,
          code: status.UNAUTHORIZED
        });
      }

      return next();
    } catch (error) {
      this.$customError.httpError(res)(error);
    }
  };

  private getDecoded = (token: string, secret: string): any => {
    try {
      const decoded = jwt.decode(token, secret);

      return pick(decoded, ['_id', 'profile', 'roles', 'courses', 'internal.stripeId']);
    } catch (error) {
      this.$customError.defaultError({
        error: error,
        readableError: `Could not decode JSON web token`,
        code: status.BAD_REQUEST
      });
    }
  }

}
