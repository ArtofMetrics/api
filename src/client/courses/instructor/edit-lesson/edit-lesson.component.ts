// External Deps
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as cloneDeep from 'lodash/cloneDeep';

// AOM Deps
import { ApiService } from 'client/core/api/api.service';
import { ViewReadyService } from 'client/shared/view-ready.service';

// AOM Interfaces

@Component({
  selector: `edit-lesson`,
  templateUrl: './edit-lesson.component.jade'
})

export class EditLessonComponent implements OnInit, OnDestroy {
  subscriptions: {
    params?: Subscription
  } = {};
  slug: string;
  moduleId: string;
  lessonId: string;
  editState: { editing: boolean } = { editing: false };
  editingDrip: any;

  lesson: any;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private viewState: ViewReadyService
  ) { }

  ngOnInit() {
    this.subscriptions.params = this.route.params
      .subscribe(
      (params: { slug: string, module: string, lesson: string }) => {
        console.log(params)
        this.slug = params.slug;
        this.moduleId = params.module;
        this.lessonId = params.lesson;

        this.getLesson({ lessonId: this.lessonId })
          .add(() => this.viewState.emitFinished());
      },
      (error) => console.error(error)
      );
  }


  ngOnDestroy() {
    this.subscriptions.params.unsubscribe();
  }

  startEditDrip = (drip) => {
    this.editingDrip = cloneDeep(drip);
    this.editState.editing = true;
  };

  addDrip = () => {
    this.apiService.instructors
      .addDrip({ slug: this.slug, moduleId: this.moduleId, lessonId: this.lessonId })
      .subscribe(
        (data) => {
          console.log('data', data);
          this.lesson.drips = data.drips
        },
        (error) => this.handleHttpError(error)
      )
  };

  deleteDrip = (drip) => {
    this.apiService.instructors
      .deleteDrip({ slug: this.slug, moduleId: this.moduleId, lessonId: this.lessonId, dripId: drip._id })
      .subscribe(
        (data) => this.lesson.drips = data.drips,
        (error) => this.handleHttpError(error)
      )
  }

  getLesson = ({ lessonId }: { lessonId: string }) => {
    return this.apiService.instructors
      .getLesson({ slug: this.slug, moduleId: this.moduleId, lessonId })
      .subscribe(
      data => {
        console.log(data)
        this.lesson = data.lesson;
        console.log(this.lesson);
      },
      error => this.handleHttpError(error)
      )
  };

  handleHttpError = (error: Error) => {
    console.error(error);
  };
}