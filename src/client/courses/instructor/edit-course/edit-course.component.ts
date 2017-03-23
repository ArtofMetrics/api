// External Deps
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as each from 'lodash/each';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { ApiService } from 'client/core/api/api.service';
import { EditCourseService } from './edit-course.service';

// AOM Models
import { Course } from 'server/dependencies/models/course';
import { CourseModule } from 'server/dependencies/models/module';

interface NewModule extends CourseModule {
  $isNew: boolean;
}

@Component({
  selector: 'edit-course',
  templateUrl: './edit-course.component.jade'
})

export class EditCourseComponent implements OnInit, OnDestroy {
  subscriptions: { slug?: Subscription } = {};
  course: Course;
  slug: string;

  constructor(
    private viewState: ViewReadyService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private editCourseService: EditCourseService
  ) {}
  
  ngOnInit() {
    this.subscriptions.slug = this.route.params
      .subscribe((params: { slug: string }) => {
        if (!this.viewState.isLoading()) {
          this.viewState.emitLoading();
        }
        this.slug = params.slug;

        this
          .fetchCourse({ slug: this.slug })
          .add(() => this.viewState.emitFinished());
      });
  }

  ngOnDestroy() {
    each(this.subscriptions, (subscription: Subscription, key: string) => {
      subscription.unsubscribe();
    });
  }

  fetchCourse = ({ slug }: { slug: string }) => {
    return this.editCourseService.getCourse({ slug })
      .subscribe(
        (data) => {
          this.course = data.course;
          console.log(this.course); 
        },
        (error) => this.handleHttpError(error)
      )
  }

  persistModule = (courseModule: CourseModule & NewModule) => {
    if (courseModule.$isNew) {
      return this.apiService.instructors
        .addModule({ slug: this.slug, module: courseModule })
        .subscribe(
          (data) => {},
          (error) => this.handleHttpError(error)
        );
    } else {
      console.log('need to add for editing module')
    }
  }

  addModule = (position: number) => {
    const data: NewModule = {
      name: '',
      description: '',
      $isNew: true,
      isVisible: false,
      lessons: []
    };

    if (position || position === 0) {
      this.course.data.modules.splice(position, 0, data);
    } else {
      this.course.data.modules.push(data);
    }

  }
  handleHttpError = (error: Error) => {
    console.error(error);
    throw error;
  }
}