// External Deps
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// AOM Deps

// AOM interfaces

type Language = 'R' | 'STATA';

@Component({
  selector: `toggle-language`,
  templateUrl: `./toggle-language.component.jade`
})

export class ToggleLanguageComponent implements OnInit{
  @Input()
  languages: Language[] = ['R', 'STATA'];

  @Input()
  default: Language;

  @Output()
  toggleLanguage: EventEmitter<string> = new EventEmitter();

  language: Language;
  constructor(

  ) {}

  ngOnInit() {
    this.language = this.default || this.languages[0];
  }

  toggle() {
    this.language = this.language === 'STATA' ? 'R' : 'STATA';
  }
}