// External Deps
import { Component, OnInit, Input } from '@angular/core';

// AOM Deps

@Component({
  selector: 'student-dashboard',
  templateUrl: './student-dashboard.component.jade'
})

export class StudentDashboardComponent {
  @Input()
  student: any;

  constructor() {}

}