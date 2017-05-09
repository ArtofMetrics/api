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
import { Course } from 'server/dependencies/models/course/course';
import { CourseModule } from 'server/dependencies/models/module';

// AOM Interfaces
interface NewModule extends CourseModule {
  $isNew: boolean;
}

// Constants
const DEFAULT_LANGUAGE = 'R';

@Component({
  selector: 'edit-course',
  templateUrl: './edit-course.component.jade'
})

export class EditCourseComponent implements OnInit, OnDestroy {
  subscriptions: { slug?: Subscription } = {};
  course: Course;
  slug: string;
  language: string;

  constructor(
    private viewState: ViewReadyService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private editCourseService: EditCourseService
  ) {}
  
  ngOnInit() {
    this.language = DEFAULT_LANGUAGE;
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
        (data) => this.course = data.course,
        (error) => this.handleHttpError(error)
      )
  }

  persistModule = (courseModule: CourseModule & NewModule) => {
    if (courseModule.$isNew) {
      return this.apiService.instructors
        .addModule({ slug: this.slug, module: courseModule, language: this.language });
    } else {
      console.log('need to add for editing module')
    }
  }

  addModule = (position: number) => {
    const data: NewModule = {
      name: `Module ${ this.course.data.modules[this.language].length + 1 } `,
      description: '',
      $isNew: true,
      isVisible: false,
      lessons: []
    };

    this.persistModule(data)
      .subscribe(
        (data) => this.course = data.course,
        (error) => this.handleHttpError(error)
      )
  };

  handleHttpError = (error: Error) => {
    console.error(error);
    throw error;
  }
}