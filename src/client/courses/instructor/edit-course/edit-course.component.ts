// External Deps
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as each from 'lodash/each';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { ApiService } from 'client/core/api/api.service';

// AOM Models
import { Course } from 'server/dependencies/models/course';

@Component({
  selector: 'edit-course',
  templateUrl: './edit-course.component.jade'
})

export class EditCourseComponent implements OnInit, OnDestroy {
  subscriptions: { slug?: Subscription } = {};
  course: Course;

  constructor(
    private viewState: ViewReadyService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.subscriptions.slug = this.route.params
      .subscribe((params: { slug: string }) => {
        if (!this.viewState.isLoading()) {
          this.viewState.emitLoading();
        }
        this
          .fetchCourse({ slug: params.slug })
          .add(() => this.viewState.emitFinished());
      });
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
        data => {
          this.course = data.course
          console.log(this.course)
        },
        error => this.handleHttpError(error))
  }

  handleHttpError = (error: Error) => {
    console.error(error);
    throw error;
  }
}