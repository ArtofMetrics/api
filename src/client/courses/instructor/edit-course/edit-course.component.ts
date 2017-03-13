// External Deps
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as each from 'lodash/each';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { ApiService } from 'client/core/api/api.service';
@Component({
  selector: 'edit-course'
})

export class EditCourseComponent implements OnInit, OnDestroy {
  subscriptions: { id: Subscription };
  course: any;
  
  constructor(
    private viewState: ViewReadyService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.subscriptions.id = this.route.params
      .subscribe(params => this.fetchCourse({ id: params.id }));
  }

  ngOnDestroy() {
    each(this.subscriptions, (subscription: Subscription, key: string) => {
      subscription.unsubscribe();
    });
  }

  fetchCourse = ({ id }: { id: string }) => {
    return this.apiService.courses
      .getCourse({ id })
      .subscribe(
        data => this.course = data.course,
        error => this.handleHttpError(error));
  }

  handleHttpError = (error: Error) => {
    console.error(error);
    throw error;
  }
}