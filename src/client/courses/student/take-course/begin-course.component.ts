// External Dependencies
import { Component, OnInit, Input } from '@angular/core';

// AOM Dependencies
import { ApiService } from 'client/core/api/api.service';

// AOM interfaces

@Component({
  selector: 'begin-course',
  templateUrl: './begin-course.component.jade'
})

export class BeginCourseComponent implements OnInit {
  @Input()
  course: any;
  
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.students
  }
}