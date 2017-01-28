// NPM Deps
import { Injectable } from '@angular/core';
import * as includes from 'lodash/includes';
import * as some from 'lodash/some';

// AOM Deps
import { JWTService } from './jwt.service';
import { ApiService } from 'client/core/api/api.service';

@Injectable()
export default class UserService {
  $: any;
  
  constructor(private jwtService: JWTService, private apiService: ApiService) {
  }

  public registerEmail = (doc) => {
    const self = this;
    return self.apiService.auth
      .register(doc)
      .then(result => {
        self.setUser(result);
      })

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