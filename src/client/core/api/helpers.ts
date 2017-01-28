import { Response } from '@angular/http';

export const extractData = function(response: Response) {
  const body = response.json();
  return body.data || {};
};