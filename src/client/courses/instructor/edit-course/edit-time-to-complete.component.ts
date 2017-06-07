// External Dependencies
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

// AOM Dependencies

// AOM Types
import { Course } from 'server/dependencies/models/course/course';

@Component({
  selector: 'edit-time-to-complete',
  templateUrl: './edit-time-to-complete.component.jade'
})

export class EditTimeToCompleteComponent implements OnInit, OnDestroy {
  @Input()
  course: Course;

  time: number;

  @Output()
  onTimeChange: EventEmitter<{ time: number }> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.time = this.course.timeToComplete;
  }

  ngOnDestroy() {
    this.onTimeChange.unsubscribe();
  }

  setTime = ev => {
    this.onTimeChange.emit({ time: ev.target.value })
  };

}