import { Injectable } from '@angular/core';

@Injectable()
export class ViewReadyService {
  state = {
    hide: true
  };

  isLoading(): boolean {
    return !!this.state.hide;
  }

  emitFinished() {
    this.state.hide = false;
  }

  emitLoading() {
    this.state.hide = true;
  }
}