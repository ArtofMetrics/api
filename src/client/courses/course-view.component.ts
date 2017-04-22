// NPM Deps
import { Component } from '@angular/core';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { UserService } from 'client/core/user.service';

@Component({
  selector: 'course-view',
  templateUrl: './course-view.component.jade'
})

export class CourseViewComponent {
  constructor(
    viewReady: ViewReadyService, 
    private userService: UserService) {
    viewReady.emitFinished();
   }

   handleHttpError = (error: Error) => {
    console.error(error);
    throw error;
   };
}