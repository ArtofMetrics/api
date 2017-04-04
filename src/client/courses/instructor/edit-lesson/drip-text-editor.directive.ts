// External Deps
import { Directive, OnInit } from '@angular/core';

// AOM Deps

// AOM interfaces
declare var CKEDITOR;

@Directive({
  inputs: ['htmlEditor'],
  selector: '[htmlEditor]'
})

export class DripTextEditor implements OnInit {
  constructor() {

  }

  ngOnInit() {
    const editor = CKEDITOR.replace('aom-text-editor');

    editor.on('change', (ev) => {
      console.log('ev', ev.editor.getData())
    })
  }
}