import { Component } from '@angular/core';
import { ViewReadyService } from 'client/shared/view-ready.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.jade',
  styleUrls: ['./app.component.styl']
})

export class AppComponent {
  applicationTitle = 'Art of Metrics';
 
}