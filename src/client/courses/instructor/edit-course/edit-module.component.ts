// External Deps
import { Component, Input, OnInit } from '@angular/core';

// AOM Deps

// AOM interfaces
import { CourseModule } from 'server/dependencies/models/module';

@Component({
  selector: 'edit-module',
  templateUrl: './edit-module.component.jade'
})

export class EditModuleComponent implements OnInit {
  @Input()
  module: CourseModule;
  
  @Input()
  idx: number;

  constructor() {}

  ngOnInit() {
    console.log(this.module);
  }

  generateId = (field: string): string => {
    return `module-${ this.idx }-${ field }`;
  }
  
}