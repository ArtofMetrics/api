// External
import { Injectable } from '@angular/core';

// AOM

// Interfaces

@Injectable()
export class ToastService {
  
  public toast = (msg: string, timeout = 4000) => {
    return (window as any).Materialize.toast(msg, timeout);
  }
}