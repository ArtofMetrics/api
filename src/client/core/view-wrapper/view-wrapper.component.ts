import { Component } from '@angular/core';
import { ViewReadyService } from 'client/shared/view-ready.service';

@Component({
  selector: 'view-wrapper',
  templateUrl: './view-wrapper.jade',
  styleUrls: ['./view-wrapper.styl']
})

export class ViewWrapperComponent {
  constructor(private viewState: ViewReadyService ) {
    
  }
}