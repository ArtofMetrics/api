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
  changeCoursePrice: EventEmitter<{ cents: number, type: string }> = new EventEmitter();

  annualPriceCents: number;
  semesterPriceCents: number;

  ngOnInit() {
    this.annualPriceCents = this.course.subscription.annualCostCents > -1 ?
      (this.course.subscription.annualCostCents / 100) :
      null;
    this.semesterPriceCents = this.course.subscription.semesterCostCents > -1 ?
      (this.course.subscription.semesterCostCents / 100) :
      null;
  }

  ngOnDestroy() {
    this.changeCoursePrice.unsubscribe();
  }

  setPrice = (event, type: 'semester' | 'annual'): void => {
    const dollars = isNil(event.target.value) || event.target.value === '' ? '0' : event.target.value;

    const dollarNum = parseFloat(dollars);

    if (isNaN(dollarNum) || dollarNum < 0) {
      return;
    } else {
      const cents = round(dollarNum * 100, 0);
      event.target.value = (cents / 100).toFixed(2);
      this.changeCoursePrice.emit({ cents, type });
    }
  }
}
