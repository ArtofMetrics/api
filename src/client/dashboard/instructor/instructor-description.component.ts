// External Deps
import { Component, Input } from '@angular/core';

// AOM Deps

@Component({
  selector: 'instructor-description',
  templateUrl: './instructor-description.component.jade'
})

export class InstructorDescriptionComponent {
  @Input()
  instructor: any;
}