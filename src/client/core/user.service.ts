import { Injectable } from '@angular/core';
import JWTService from './jwt.service';

@Injectable()
export default class UserService {
  constructor(private jwt: JWTService) {
    
  }

  public isLoggedIn(): boolean {
    return !!this.jwt.getToken();
  }

  public isAdmin(): boolean {
    return false;
  }

  public isInstructor(): boolean {
    return false;
  }

  public isStudent(): boolean {
    return true;
  }
}