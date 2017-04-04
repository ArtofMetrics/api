// External Deps
import { Component, Input, Output, OnInit } from '@angular/core';
// AOM Deps
import { DripTextEditor } from './drip-text-editor.directive';

// AOM Interfaces
declare var CKEDITOR;
@Component({
  selector: 'edit-drip',
  templateUrl: './edit-drip.component.jade'
})

export class EditDripComponent {
  @Input()
  drip: any;

  constructor(

  ) {}

  ngOnInit() {
    console.log('drip', this.drip);
  }

  saveDrip = () => {
  }
}