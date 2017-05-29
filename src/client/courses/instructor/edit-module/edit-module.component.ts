// External Deps
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as every from 'lodash/every';

// AOM Deps
import { ApiService } from 'client/core/api/api.service';
import { ViewReadyService } from 'client/shared/view-ready.service';

@Component({
  selector: 'edit-module',
  templateUrl: './edit-module.component.jade'
})

export class EditModuleComponent implements OnInit, OnDestroy {
  subscriptions: {
    course?: Subscription,
    language?: Subscription,
  } = {};

  slug: string;
  course: any;
  module: any;
  moduleId: string;
  language: string;

  constructor(
    private apiService: ApiService,
    private viewState: ViewReadyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.language = this.route.queryParams
      .subscribe(({ language }: { language: string }) => {
        this.language = language;
      });

    this.subscriptions.course = this.route.params
      .subscribe((params: { slug: string, module: string }) => {
        if (!this.viewState.isLoading()) {
          this.viewState.emitLoading();
        }

        const { module: moduleId, slug } = params;
        this.moduleId = moduleId;
        this.slug = slug;

        this.apiService.instructors
          .getModule({ slug, moduleId, language: this.language })
          .subscribe(
          (data) => {
            this.course = data.course;
            this.module = data.module;
            this.module.lessons = this.module.lessons || [];
            this.viewState.emitFinished();
          },
          (error) => this.handleHttpError(error))
      });
  }

  ngOnDestroy() {
    this.subscriptions.course.unsubscribe();
    this.subscriptions.language.unsubscribe();
  }
  
  editLesson = (lesson) => {
    this.router.navigate(
      ['course', this.course.slug, 'module', this.module._id, 'lesson', lesson._id, 'edit'],
      { queryParams: { language: this.language } });
  };
  
  addLesson = () => {
    const name = `Lesson ${(this.module.lessons).length + 1}`;
    const { slug, module: { _id: moduleId }, language } = this;

    this.apiService.instructors
      .addNewLesson({ slug, moduleId, newLesson: { name }, language })
      .subscribe(
      data => this.module.lessons = data.lessons,
      error => this.handleHttpError(error));
  }

  deleteLesson = (lesson) => {
    const { slug, language } = this;
    return this.apiService.instructors
      .deleteLesson({ slug, moduleId: this.module._id, lessonId: lesson._id, language })
      .subscribe(
        data => this.module.lessons = data.lessons,
        error => this.handleHttpError(error)
      )
  }

  goBack = () => {
    this.router.navigate(['course', this.course.slug, 'edit']);
  }

  handleHttpError = (error: Error) => {
    console.error(error);
  }
}