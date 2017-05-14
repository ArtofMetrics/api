// External Dependencies
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as isNaN from 'lodash/isNaN';
import * as round from 'lodash/round';
import * as isNil from 'lodash/isNil';

// AOM Dependencies

// AOM Interfaces
import { Course } from 'server/dependencies/models/course/course';

@Component({
  selector: `edit-price`,
  templateUrl: './edit-price.component.jade'
})

export class EditPriceComponent implements OnInit {
  @Input()
  course: Course;

  @Output()
  changeCourseLength: EventEmitter<string> = new EventEmitter();

  @Output()
  changeCoursePrice: EventEmitter<number> = new EventEmitter();

  lengths: string[] = ['semester', 'annual'];

  lengthTypes = {
    semester: 'Semester',
    annual: 'Annual'
  };

  ngOnInit() {
    console.log('HIS.COURSE', this.course);
    $('#course-length').material_select();
  }

  ngOnDestroy() {
    this.changeCourseLength.unsubscribe();
    this.changeCoursePrice.unsubscribe();
  }

  setLength = (length: string): void => {
    this.changeCourseLength.emit(length);
  }

  setPrice = (event): void => {
    const dollars = isNil(event.target.value) || event.target.value === '' ? '0' : event.target.value;

    const dollarNum = parseFloat(dollars);

    if (isNaN(dollarNum) || dollarNum < 0) {
      return;
    } else {
      const cents = round(dollarNum * 100, 0);
      event.target.value = (cents / 100).toFixed(2);
      this.changeCoursePrice.emit(cents);
    }
  }
}
