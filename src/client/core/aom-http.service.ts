import { Injectable } from '@angular/core';
import { RequestOptions, RequestOptionsArgs, Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// AOM Deps
import { JWTService } from 'client/core/jwt.service';

interface HttpCustomOptions {
  promise?: boolean;
  observable?: boolean;
}

@Injectable()
export class AomHTTPService {
  constructor(private _jwtService: JWTService,
              private _http: Http,
              defaultOptions: RequestOptions ) { 
  }

  get = (url: string, params?: RequestOptionsArgs, customOptions?: HttpCustomOptions): Observable<Response> => {
    return this._http
      .get(url, Object.assign({}, params, { headers: this.defineHeaders() }));
  }

  post = (url: string, params: RequestOptionsArgs, customOptions?: HttpCustomOptions): Observable<Response> => {
    return this._http
      .post(url, params, { headers: this.defineHeaders() });
  }

  put = (url: string, params: RequestOptionsArgs, customOptions?: HttpCustomOptions): Observable<Response> => {
    return this._http
      .put(url, params, { headers: this.defineHeaders() });
  }
  
  delete = (url: string, params?: RequestOptionsArgs): Observable<Response> => {
    return this._http
      .delete(url, Object.assign(params, { headers: this.defineHeaders() }));
  }

  private defineHeaders(): Headers {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this._jwtService.getToken()}`);
    return headers;
  }
}