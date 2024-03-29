
import { Injectable } from '@angular/core';
import { RequestOptions, RequestOptionsArgs, Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as qs from 'qs';

// AOM Deps
import { JWTService } from 'client/core/jwt.service';
import { extractData } from 'client/core/api/helpers';

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

  get = (url: string, params?: any, customOptions?: HttpCustomOptions): Observable<any> => {
    const urlQuery = params ? `${url}?${qs.stringify(params)}` : url;

    return this._http
      .get(urlQuery, Object.assign({}, params, { headers: this.defineHeaders() }))
      .map(response => extractData(response));
  }

  post = (url: string, params?: any, customOptions?: HttpCustomOptions): Observable<any> => {
    return this._http
      .post(url, params, { headers: this.defineHeaders() })
      .map(response => extractData(response));
  }

  put = (url: string, params: any, customOptions?: HttpCustomOptions): Observable<any> => {
    return this._http
      .put(url, params, { headers: this.defineHeaders() })
      .map(response => extractData(response));
  }
  
  delete = (url: string, params?: any): Observable<any> => {
    return this._http
      .delete(url, { headers: this.defineHeaders() })
      .map(response => extractData(response));
  }

  private defineHeaders(): Headers {
    const headers = new Headers();
    const token = this._jwtService.getToken();
    if (token) {
      headers.append('Authorization', token);
    }
    return headers;
  }
}