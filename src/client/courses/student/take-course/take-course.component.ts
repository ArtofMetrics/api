// External Dependencies
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// AOm Dependencies
import { ApiService } from 'client/core/api/api.service';
import { ErrorService } from 'client/core/error.service';

// AOM Interfaces

@Component({
  selector: 'take-course',
  templateUrl: './take-course.component.jade'
})

export class TakeCourseComponent implements OnInit {
  @Input()
  course: any;

  state: 'CONTINUE' | 'BEGIN';
  constructor(
    private apiService: ApiService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
   if (this.course.lastCompleted > -1) {
     this.state = 'CONTINUE';
   } else {
     this.state = 'BEGIN';
   }
  }
}