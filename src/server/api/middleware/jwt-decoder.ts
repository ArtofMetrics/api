// NPM Deps
import { ServiceManager } from 'stejar-di';
import * as jwt from 'jwt-simple';
import { Request, Response, NextFunction } from 'express';
import * as status from 'http-status';
import { Document } from 'mongoose';

// AOM Deps
import { Config } from '../../dependencies/config';
import { CustomErrorService } from '../../dependencies/custom-error.service';
import { IUser } from '../../dependencies/models/user/user.model';

interface Decoded extends IUser, Document {
  valid: boolean;
  id: string;
}
export interface ReqUser {
  _id: string;

  profile: { email: string, name: { first: string, last: string } };

  role: string;
}

export interface AuthenticatedRequest extends Request {
  headers: {
    authorization: string;
  }

  user?: ReqUser
}



export class Middleware {
  private $config: Config;
  private $customError: CustomErrorService;

  constructor(di: ServiceManager) {
    const self = this;

    ['$config', '$customError'].forEach(dep => self[dep] = di.get(dep));
  }

  public jwtDecoder(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const self = this;
    try {
      let decoded: Decoded;
      const token = req.headers.authorization;
      if (token) {
        const secret = this.$config.jwt.secret;
        decoded = self.getDecoded(token, secret);
        if (!decoded || !decoded.valid) {
          throw self.$customError.defaultError({
            error: `Decoded token is not valid`,
            readableError: `Could not decode token or token is invalid`,
            code: status.BAD_REQUEST
          });
        }

        req.user = { _id: decoded.id, profile: decoded.profile, role: decoded.role };
      }

      next();
    } catch (error) {
      this.$customError.httpError(error)(res);
    }
  }

  private getDecoded(token: string, secret: string): any {
    const self = this;
    try {
      const decoded = jwt.decode(token, secret);
      return decoded;
    } catch (error) {
      throw this.$customError.defaultError({
        error: error,
        readableError: `Could not decode JSON web token`,
        code: status.BAD_REQUEST
      });
    }
  }

}