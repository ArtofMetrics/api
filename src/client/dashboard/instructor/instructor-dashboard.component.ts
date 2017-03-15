// External Deps
import { Component, Input, ElementRef } from '@angular/core';

// AOM Deps

@Component({
  selector: 'instructor-dashboard',
  templateUrl: './instructor-dashboard.component.jade'
})

export class InstructorDashboardComponent {
  @Input()
  instructor: any;

  constructor() {}

}