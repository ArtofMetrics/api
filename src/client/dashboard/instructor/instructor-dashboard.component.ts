// External Deps
import { Component, Input, ElementRef, OnInit } from '@angular/core';

// AOM Deps

@Component({
  selector: 'instructor-dashboard',
  templateUrl: './instructor-dashboard.component.jade'
})

export class InstructorDashboardComponent implements OnInit {
  @Input()
  instructor: any;

  constructor() {}

  ngOnInit() {
    
  }
}