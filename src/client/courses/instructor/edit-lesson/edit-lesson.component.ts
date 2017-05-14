// External Deps
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as cloneDeep from 'lodash/cloneDeep';
import * as findIndex from 'lodash/findIndex';
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
    params?: Subscription,
    query?: Subscription
  } = {};
  slug: string;
  moduleId: string;
  lessonId: string;
  editState: { editing: boolean } = { editing: false };
  editingDrip: any;
  language: string;
  lesson: any;
  
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private viewState: ViewReadyService
  ) { }

  ngOnInit() {
    this.subscriptions.query = this.route.queryParams
      .subscribe(({ language }: { language: string }) => {
        this.language = language;
      });

    this.subscriptions.params = this.route.params
      .subscribe(
      (params: { slug: string, module: string, lesson: string }) => {
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
    this.subscriptions.query.unsubscribe();
  }

  startEditDrip = (drip) => {
    this.editingDrip = drip;
    this.editState.editing = true;
  };

  addDrip = () => {
    const { slug, moduleId, lessonId, language } = this;
    this.apiService.instructors
      .addDrip({ slug, moduleId, lessonId, language })
      .subscribe(
        (data) => this.lesson.drips = data.drips,
        (error) => this.handleHttpError(error)
      )
  };

  saveDrip = ($event) => {
    const { drip } = $event;
    const { slug, moduleId, lessonId, language } = this;
    this.apiService.instructors
      .saveDrip({ slug, moduleId, lessonId, drip, language })
      .subscribe(
        data => {
          const idx = findIndex(this.lesson.drips, 
            (drip: any) => drip._id.toString() === data.drip._id.toString());
          this.lesson.drips[idx] = data.drip;

          this.endEditDrip();
        },
        error => this.handleHttpError(error)
      )
  }

  endEditDrip = () => {
    this.editingDrip = null;
    this.editState.editing = false;
  };

  deleteDrip = (drip) => {
    this.endEditDrip();
    const { slug, moduleId, lessonId, language } = this;
    this.apiService.instructors
      .deleteDrip({ slug, moduleId, lessonId, dripId: drip._id, language })
      .subscribe(
        (data) => this.lesson.drips = data.drips,
        (error) => this.handleHttpError(error)
      )
  }

  getLesson = ({ lessonId }: { lessonId: string }) => {
    const { slug, moduleId, language } = this;

    return this.apiService.instructors
      .getLesson({ slug, moduleId, lessonId, language })
      .subscribe(
      data => this.lesson = data.lesson,
      error => this.handleHttpError(error)
      )
  };

  goBack = () => {
    this.router.navigate(
      ['course', this.slug, 'module', this.moduleId, 'edit'],
      { queryParams: { language: this.language } });
  };

  handleHttpError = (error: Error) => {
    console.error(error);
  };
}