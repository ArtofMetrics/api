// External Deps
import { Directive, Output, Input, EventEmitter, OnInit } from '@angular/core';

// AOM Deps

// AOM interfaces
declare var CKEDITOR;

@Directive({
  inputs: ['htmlEditor'],
  selector: '[htmlEditor]'
})

export class DripTextEditor implements OnInit {
  
  @Output() onDripText: EventEmitter<{ text: string }> = new EventEmitter();
  @Input() dripText: string;

  constructor() {

  }

  ngOnInit() {
    const editor = CKEDITOR.replace('aom-text-editor');
    console.log(CKEDITOR);
    if (this.dripText) {
      editor.setData(this.dripText);
    }
    
    editor.on('change', (ev) => {
      this.onDripText.emit({ text: ev.editor.getData() });
    });
  }
}