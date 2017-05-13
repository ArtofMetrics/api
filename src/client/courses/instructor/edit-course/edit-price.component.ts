// External Dependencies
import { Component, Input } from '@angular/core';

// AOM Dependencies

// AOM Interfaces
import { Course } from 'server/dependencies/models/course/course';

@Component({
  selector: `edit-price`,
  templateUrl: './edit-price.component.jade'
})

export class EditPriceComponent {
  @Input()
  course: Course;

  constructor(

  ) {}

  setPrice = (event) => {
    console.log(`value ${ event.target.value }`);
  }
}
