// External Deps
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// AOM Deps

// AOM interfaces
import { Course } from 'server/dependencies/models/course';
import { CourseModule } from 'server/dependencies/models/module';

@Component({
  selector: 'module-row',
  templateUrl: './module-row.component.jade'
})

export class ModuleRowComponent implements OnInit {
  @Input()
  module: CourseModule;
  
  @Input()
  course: Course;

  @Input()
  idx: number;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    console.log('MODULE', this.module);
    console.log('COURSE', this.course)
  }

  editModule = () => {
    this.router.navigate([`course`, this.course.slug, 'module', this.module._id, 'edit']);
  };

  generateId = (field: string): string => {
    return `module-${ this.idx }-${ field }`;
  }
  
}