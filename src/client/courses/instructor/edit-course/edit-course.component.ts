// External Deps
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as each from 'lodash/each';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { ApiService } from 'client/core/api/api.service';
import { EditCourseService } from './edit-course.service';
import { ToastService } from 'client/core/toast.service';

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
  coverPhotoUrl: string;

  constructor(
    private viewState: ViewReadyService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private editCourseService: EditCourseService,
    private toastService: ToastService
  ) { }

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
      (data) => {
        this.course = data.course;
        this.coverPhotoUrl = this.course.data.photos[0].url;
      },
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
      name: `Module ${this.course.data.modules[this.language].length + 1} `,
      description: '',
      $isNew: true,
      isVisible: false,
      lessons: []
    };

    this.persistModule(data)
      .subscribe(
      (data) => this.course = data.course,
      (error) => this.handleHttpError(error)
      );
  };

  deleteModule = (payload): void => {
    const { slug, language } = this;
    const { module: { _id: moduleId } } = payload;

    this.apiService.instructors
      .deleteModule({ moduleId, language, slug })
      .subscribe(
      data => {
        this.course = data.course;
        this.toastService.toast(`${payload.module.name} deleted `);
      },
      error => {
        this.toastService.toast(`Oops, there was an error deleting ${payload.module.name}`);
        this.handleHttpError(error);
      }
      );
  }

  handleHttpError = (error: Error) => {
    console.error(error);
    throw error;
  }

  setCoursePrice = ({ cents, type }: { cents: number, type: 'semester' | 'annual' }) => {
    if (type === 'annual') {
      this.course.set('course.subscription.annualCostCents', cents);
    } else if (type === 'semester') {
      this.course.set('course.subscription.semesterCostCents', cents);
    }
  };

  saveCourse = () => {
    if (this.coverPhotoUrl) {
      this.course.data.photos[0].url = this.coverPhotoUrl;
    }

    this.apiService.instructors
      .saveCourse({
        course: {
          difficulty: this.course.difficulty,
          subscription: this.course.subscription,
          data: {
            description: this.course.data.description,
            photos: this.course.data.photos
          }
        },
        slug: this.course.slug
      })
      .subscribe(
      (data) => {
        this.course = data.course;
        this.toastService.toast(`Course saved successfully`);
      },
      (error) => {
        this.toastService.toast(`Oops, there was an error saving your course`);
        this.handleHttpError(error);
      }
      );
  };

  toggleCourseVisibility = (visible: boolean) => {
    this.apiService.instructors.toggleVisibility({ course: this.course })
      .subscribe(
      data => this.course.isVisible = data.visibility,
      error => {
        this.toastService.toast(`Oops, the course isnt valid enough to be visible.`);
        this.handleHttpError(error)
      }
      );
  };

  setDifficulty = (difficulty: string) => {
    this.course.difficulty = difficulty;
    console.log('set difficulty', this.course);
  }

  @Input()
  setLanguage = ({ language }) => {
    this.language = language;
  }
}
