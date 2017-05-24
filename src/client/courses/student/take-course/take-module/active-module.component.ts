// External Dependencies
import { Component, Input } from '@angular/core';

// AOM Dependencies

// AOM Interfaces
import { CourseModule } from 'server/dependencies/models/module';

@Component({
  selector: 'active-module',
  templateUrl: './active-module.component.jade'
})

export class ActiveModuleComponent {
  @Input()
  module: CourseModule;

  constructor() {
    console.log('MODULE', this.module);
  }
}
