// External Deps
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as every from 'lodash/every';

// AOM Deps
import { ApiService } from 'client/core/api/api.service';
import { ViewReadyService } from 'client/shared/view-ready.service';

@Component({
  selector: 'edit-module',
  templateUrl: './edit-module.component.jade'
})

export class EditModuleComponent implements OnInit {
  subscriptions: {
    course?: Subscription
  } = {};

  slug: string;
  course: any;
  module: any;

  constructor(
    private apiService: ApiService,
    private viewState: ViewReadyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscriptions.course = this.route.params
      .subscribe((params: { slug: string, module: string }) => {
        if (!this.viewState.isLoading()) {
          this.viewState.emitLoading();
        }

        const { module: moduleId, slug } = params;

        this.apiService.instructors
          .getModule({ slug, moduleId })
          .subscribe(
            (data) => {
              this.course = data.course;
              this.module = data.module;
              this.viewState.emitFinished();
            },
            (error) => this.handleHttpError(error))
      });
  }

  canAddLesson = () => {
    return !this.module.lessons.length || 
      every(this.module.lessons, (lesson: any) => lesson.isVisible);
  }

  addLesson = () => {
    console.log(this.module)
    const name = `Lesson ${ this.module.lessons.length + 1 }`;
    this.apiService.instructors
      .addNewLesson({ slug: this.slug, moduleId: this.module._id, newLesson: { name } })
      .subscribe(data => {
        this.module.lessons = data.lessons;
      })
  }

  handleHttpError = (error: Error) => {
    console.error(error);
  }
}