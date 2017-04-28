// External Dependencies
import { Component, OnInit } from '@angular/core';

// AOM Dependencies
import { ApiService } from 'client/core/api/api.service';

// AOM interfaces

@Component({
  selector: 'begin-course',
  templateUrl: './begin-course.component.jade'
})

export class BeginCourseComponent implements OnInit {
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.students
  }
}