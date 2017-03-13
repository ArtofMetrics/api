// External Deps
import { Component, Input } from '@angular/core';

// AOM Deps

@Component({
  selector: 'student-description',
  templateUrl: './student-description.component.jade'
})

export class StudentDescriptionComponent {
  @Input()
  student: any;


}