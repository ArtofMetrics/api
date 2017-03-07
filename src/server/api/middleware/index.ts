// NPM Deps
import * as jwt from 'jwt-simple';
import { Request, Response, NextFunction } from 'express';
import * as status from 'http-status';
import { Document } from 'mongoose';

// AOM Deps
import { Config } from '../../dependencies/config';
import { CustomErrorService } from '../../dependencies/custom-error.service';

// AOM models
import { AuthenticatedRequest } from '../interfaces/authenticated-request.model';
import { RequestUser } from '../interfaces/request-user.model';

interface Decoded {
  valid: boolean;
  id: string;
  profile: {
    name: {
      first: string;
      last: string;
    };
    email: string;
  }

  role: string;
}

export class Middleware {
  private $config: Config;
  private $customError: CustomErrorService;

  constructor(di) {
    const self = this;
    di.invoke(function ($config, $customError) {
      self.$config = $config;
      self.$customError = $customError;
    });
  }

  public jwtDecoder = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      let decoded: Decoded;
      const token = req.headers.authorization;
      if (token) {
        const secret = this.$config.jwt.secret;
        decoded = this.getDecoded(token, secret);
        if (!decoded || !decoded.valid) {
          this.$customError.defaultError({
            error: `Decoded token is not valid`,
            readableError: `Could not decode token or token is invalid`,
            code: status.BAD_REQUEST
          });
        }

        req.user = { _id: decoded.id, profile: decoded.profile, role: decoded.role };
      }

      next();
    } catch (error) {
      this.$customError.httpError(res)(error);
    }
  }

  private getDecoded = (token: string, secret: string): any => {
    try {
      const decoded = jwt.decode(token, secret);
      return decoded;
    } catch (error) {
      this.$customError.defaultError({
        error: error,
        readableError: `Could not decode JSON web token`,
        code: status.BAD_REQUEST
      });
    }
  }

}