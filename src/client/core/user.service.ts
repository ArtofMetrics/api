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
  ALLOWED_OAUTH_SERVICES = ['linkedin', 'facebook'];

  constructor(private jwtService: JWTService,
    private apiService: ApiService,
    private config: Config) {
  }

  public registerEmail = (params: RegistrationParams) => {
    return this.apiService.auth
      .register(params)
      .do(result => this.setUser(result));

  }

  public authenticateOauth = (userDoc: any, type: string): Promise<any> => {
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
          .do(result => this.setUser(result))
          .subscribe(
            data => resolve(data),
            error => reject(error));
      });
    });

  }
  
  public load = () => {
    return this.apiService.auth
      .getMe()
      .do(result => this.setUser(result));
  }

  private setUser = (result: { user?: any }) => {
    this.$ = result.user || null;
  }
  /**
   * @desc Asynchronously determines if user is logged
   */
  public isLoggedInAsync = (): Promise<boolean> => {
    return this
      .load()
      .toPromise()
      .then(() => {
        return !!this.$;
      });
  }

  public isLoggedIn = () => {
    return !!this.$;
  }
  public isAdmin = (): boolean => {
    return this.hasRole(this.$, 'admin');
  }

  public isInstructor = (): boolean  => {
    return this.hasRole(this.$, 'instructor');
  }

  public isStudent = (): boolean => {
    return this.hasRole(this.$, 'student');
  }

  private hasRole = (user: any, role: string | string[]) => {
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

  private handleHttpError = (error) => {
    console.log(error);
    throw error;
  }
}
