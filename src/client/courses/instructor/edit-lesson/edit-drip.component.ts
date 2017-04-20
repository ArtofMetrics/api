// External Deps
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// AOM Deps
import { DripTextEditor } from './drip-text-editor.directive';
import { ApiService } from 'client/core/api/api.service';

// AOM Interfaces
declare var CKEDITOR;
@Component({
  selector: 'edit-drip',
  templateUrl: './edit-drip.component.jade'
})

export class EditDripComponent {
  @Input()
  drip: any;

  @Output()
  saveDrip: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {

  }

  editDrip = ($event: { text: string }): void => {
    this.drip.text = $event.text;
  }

  addQuestionQuiz = () => {
    if (this.drip.questionQuiz) {
      return;
    }

    this.drip.questionQuiz = {
      question: '',
      answers: []
    };
  }

  addQuestionQuizAnswer = () => {
    this.drip.questionQuiz.answers.push('');
  }

  persist = () => {
    this.saveDrip.emit({ drip: this.drip });
  }
  
}