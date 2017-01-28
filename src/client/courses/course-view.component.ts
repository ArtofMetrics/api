// NPM Deps
import { Component } from '@angular/core';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';

@Component({
  selector: 'course-view',
  templateUrl: './course-view.component.jade'
})

export class CourseViewComponent {
  constructor(viewReady: ViewReadyService) {
    viewReady.emitFinished();
   }
  
}