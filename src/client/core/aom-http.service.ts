import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// AOM Deps
import { JWTService } from 'client/core/jwt.service';

interface HttpCustomOptions {
  promise?: boolean;
  observable?: boolean;
}

@Injectable()
export class AomHTTPService {
  constructor(private http: Http, private jwtService: JWTService) { }

  public get = (url: string, params?: any, customOptions?: HttpCustomOptions): Observable<any> => {
    return this.http
      .get(url, Object.assign({}, params, { headers: this.defineHeaders() }));
  }

  public post = (url: string, params: {}, customOptions?: HttpCustomOptions) => {
    return this.http
      .post(url, params, Object.assign({}, customOptions || {}, { headers: this.defineHeaders() }));
  }

  public put = (url: string, params: {}, customOptions?: HttpCustomOptions) => {
    return this.http
      .put(url, params, Object.assign({}, customOptions || {}, { headers: this.defineHeaders() }));
  }
  
  public delete = (url: string, customOptions?: HttpCustomOptions) => {
    return this.http
      .delete(url, Object.assign({}, customOptions || {}, { headers: this.defineHeaders() }));
  }

  private defineHeaders(): Headers {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.jwtService.getToken()}`);
    return headers;
  }
}