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
  subscriptions: { slug: Subscription };
  course: any;

  constructor(
    private viewState: ViewReadyService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.subscriptions.slug = this.route.params
      .subscribe((params: { slug: string }) => this.fetchCourse({ slug: params.slug }));
  }

  ngOnDestroy() {
    each(this.subscriptions, (subscription: Subscription, key: string) => {
      subscription.unsubscribe();
    });
  }

  fetchCourse = ({ slug }: { slug: string }) => {
    return this.apiService.courses
      .getCourseBySlug({ slug })
      .subscribe(
        data => this.course = data.course,
        error => this.handleHttpError(error));
  }

  handleHttpError = (error: Error) => {
    console.error(error);
    throw error;
  }
}