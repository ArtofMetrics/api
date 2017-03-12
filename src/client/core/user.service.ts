// NPM Deps
import { Injectable } from '@angular/core';
import * as facebook from 'facebook-oauth-agent';
import * as linkedin from 'linkedin-oauth-agent';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// import * as google from 'google-auth-agent';

import * as includes from 'lodash/includes';
import * as some from 'lodash/some';

// AOM Deps
import { JWTService } from './jwt.service';
import { ApiService } from 'client/core/api/api.service';
import { Config } from 'client/core/config';

// Interfaces
import { RegistrationEmailRequest } from 'server/api/auth/models';

@Injectable()
export class UserService {
  $: any;
  private _stateTracker = new BehaviorSubject<string>('INIT');
  state$ = this._stateTracker.asObservable();

  ALLOWED_OAUTH_SERVICES = ['linkedin', 'facebook'];

  constructor(private jwtService: JWTService,
    private apiService: ApiService,
    private config: Config) {
  }

  public registerEmail = (params: RegistrationEmailRequest) => {
    return this.apiService.auth
      .register(params);
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
      .toPromise()
      .then(result => this.setUser(result));
  }

  public logout = (): void => {
    this.jwtService.clearToken();
    this.$ = null;
    this._stateTracker.next('LOGGED_OUT');
  }

  /**
   * @desc Asynchronously determines if user is logged
   */
  public isLoggedInAsync = (): Promise<boolean> => {
    return this
      .load()
      .then(() => !!this.$);
  }

  /**
   * @desc Determines if a user is logged in
   */
  public isLoggedIn = () => {
    return !!this.$;
  }

  /**
   * @desc Determines if a user is an admin
   */
  public isAdmin = (): boolean => {
    return this.hasRole(this.$, 'admin');
  }

  /**
   * @desc Determines if a user is an instructor
   */
  public isInstructor = (): boolean => {
    return this.hasRole(this.$, 'instructor');
  }

  /**
   * @desc Determines if a user is a student
   */
  public isStudent = (): boolean => {
    return this.hasRole(this.$, 'student');
  }

  /**
   * @desc Sets the user on the $ state tracking property and also sets jwt
   */
  public setUser = (result: { user?: any, token?: string }) => {
    this.$ = result.user || null;
    if (result.token) {
      this.jwtService.setToken(result.token);
    }
    if (this.$) {
      this._stateTracker.next('LOGGED_IN');
    }

    return Object.assign({}, this.$);
  }

  /**
   * @desc Determines if a user has a given role or roles
   */
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
    throw error;
  }
}
