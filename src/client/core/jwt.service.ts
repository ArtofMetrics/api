// NPM Deps
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';


/**
 * Authentication service that abstracts out getting and setting
 * jwt tokens in local storage, so that the user service doesn't know
 * how authentication works, but just that the user is or is not authenticated
 */

@Injectable()
export class JWTService {
  TOKEN_NAME: string = 'id_token';
  constructor(private authHttp: AuthHttp) {
  }

  // Fetches JWT from local storage
  public getToken(): string {
    const token = window.localStorage.getItem(this.TOKEN_NAME);
    return token;
  }

  // Sets JWT in local storage
  public setToken(token: string): string {
    if (token) {
      window.localStorage.setItem(this.TOKEN_NAME, token);
    }

    return token;
  }
}