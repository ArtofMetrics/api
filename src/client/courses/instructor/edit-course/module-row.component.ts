// External Deps
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// AOM Deps

// AOM interfaces
import { Course } from 'server/dependencies/models/course/course';
import { CourseModule } from 'server/dependencies/models/module';

@Component({
  selector: 'module-row',
  templateUrl: './module-row.component.jade'
})

export class ModuleRowComponent {
  @Input()
  language: string;

  @Input()
  module: CourseModule;

  @Input()
  course: Course;

  @Input()
  idx: number;

  @Output()
  onDeleteModule: EventEmitter<{ module: any }> = new EventEmitter();

  constructor(
    private router: Router
  ) {}

  editModule = () => {
    this.router.navigate(
      [`course`, this.course.slug, 'module', this.module._id, 'edit'],
      { queryParams: { language: this.language } });
  };

  deleteModule = () => {
    this.onDeleteModule.emit({ module: this.module });
  }
  
  generateId = (field: string): string => {
    return `module-${ this.idx }-${ field }`;
  }

}
