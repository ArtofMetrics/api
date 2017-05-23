// NPM Deps
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// AOM Deps
import { ApiService } from 'client/core/api/api.service';
import { ViewReadyService } from 'client/shared/view-ready.service';
import { UserService } from 'client/core/user.service';

@Component({
  selector: 'course-view',
  templateUrl: './course-view.component.jade'
})

export class CourseViewComponent implements OnInit, OnDestroy {
  subscriptions: {
    slug?: Subscription
  } = {};
  course: any;
  isSubscribed: boolean;

  constructor(
    viewReady: ViewReadyService,
    private userService: UserService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute) {
    viewReady.emitFinished();
   }

   ngOnInit() {
    this.subscriptions.slug = this.activatedRoute
      .params
      .subscribe(
        (params: { slug: string }) => {
          this.apiService.students
            .getCourseBySlug(params)
            .map(data => this.course = data.course)
            .subscribe(
              data => {
                this.isSubscribed = this.course && this.course.subscription.subscribed;
              },
              (error) => this.handleHttpError(error)
            )
        },
        (error) => this.handleHttpError(error)
      );
   }

   ngOnDestroy() {
     this.subscriptions.slug.unsubscribe();
   }

   getCourse = ({ slug }: { slug: string }) => {
    return this.apiService.students.getCourseBySlug({ slug });
   };

   handleHttpError = (error: Error) => {
    console.error(error);
    throw error;
   };
}
