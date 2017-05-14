// External Dependencies
import { Injectable } from '@angular/core';

// AOM Dependencies

// AOM Interfaces

@Injectable()
export class ErrorService {
  constructor() {}

  public handleHttpError = (error) => {
    this.logError(error);
    throw error;
  };

  public logError = (error) => {
    console.error(error);
  }
}