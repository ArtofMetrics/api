// NPM Deps
import { Injectable } from '@angular/core';
import * as facebook from 'facebook-oauth-agent';
import * as linkedin from 'linkedin-oauth-agent';
// import * as google from 'google-auth-agent';

import * as includes from 'lodash/includes';
import * as some from 'lodash/some';

// AOM Deps
import { JWTService } from './jwt.service';
import { ApiService } from 'client/core/api/api.service';
import { Config } from 'client/core/config';

// Interfaces
import { RegistrationParams } from 'shared/interfaces/user-registration.model';

@Injectable()
export class UserService {
  $: any;
  ALLOWED_OAUTH_SERVICES = ['linkedin', 'google', 'facebook'];

  constructor(private jwtService: JWTService,
    private apiService: ApiService,
    private config: Config) {
  }

  public registerEmail = (params: RegistrationParams) => {
    const self = this;
    return self.apiService.auth
      .register(params)
      .then(result => {
        self.setUser(result);
      })

  }

  public authenticateOauth = (userDoc: any, type: string) => {
    return new Promise((resolve, reject) => {
      let method = { linkedin, facebook }[type];
      if (!method) {
        return reject(new Error(`No method ${type}`));
      }

      method(this.config[type].client_id, (err, code) => {
        if (err) {
          return reject(err);
        }

        this.apiService.auth
          .authenticateOauth(userDoc, type)
          .then(result => {
            this.setUser(result);
            return resolve(result);
          });
      });
    });

  }

  public load() {
    const self = this;
    return self.apiService.auth
      .getMe()
      .then(result => {
        self.setUser(result);
      });
  }

  private setUser = (result: { user?: any }) => {
    this.$ = result.user || null;
  }
  /**
   * @desc Asynchronously determines if user is logged
   */
  public isLoggedInAsync(): Promise<boolean> {
    const self = this;
    return self
      .load()
      .then(() => {
        return !!self.$;
      });
  }

  public isLoggedIn() {
    const self = this;
    return !!self.$;
  }
  public isAdmin(): boolean {
    const self = this;
    return self.hasRole(self.$, 'admin');
  }

  public isInstructor(): boolean {
    const self = this;
    return self.hasRole(self.$, 'instructor');
  }

  public isStudent(): boolean {
    const self = this;
    return self.hasRole(self.$, 'student');
  }

  private hasRole(user: any, role: string | string[]) {
    if (!user || !user.roles) {
      return false;
    }

    if (role instanceof String) {
      return includes(user.roles, role);
    } else {
      return some(role, r => {
        return includes(user.roles, r);
      });
    }
  }
}
