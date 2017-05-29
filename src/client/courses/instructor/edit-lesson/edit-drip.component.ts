// External Deps
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AceEditorDirective } from 'ng2-ace';
import 'brace/mode/r';
import 'brace/theme/twilight';
import * as unset from 'lodash/unset';

// AOM Deps
import { DripTextEditor } from './drip-text-editor.directive';
import { EditDripService } from './edit-drip.service';

// AOM Interfaces
import { Drip } from 'server/dependencies/models/module/drip';


declare var CKEDITOR;
@Component({
  selector: 'edit-drip',
  templateUrl: './edit-drip.component.jade',
  styleUrls: ['./edit-drip.component.styl', '../../shared/text-editor.styl']
})

export class EditDripComponent {
  @Input()
  drip: any;

  @Output()
  saveDrip: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private editDripService: EditDripService
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
      answers: [],
      correctAnswers: []
    };
  }

  removeQuestionQuiz = () => unset(this.drip, 'questionQuiz');

  removeConsoleQuiz = () => unset(this.drip, 'consoleQuiz');

  addQuestionQuizAnswer = () => {
    this.drip.questionQuiz.answers.push({ text: '' });
  }

  addConsoleQuiz = () => {
    this.drip.consoleQuiz = { question: '', answer: '' };
  };

  isCorrectMCAnswer = (idx: number): boolean => {
    return this.editDripService
      .isCorrectMCAnswer(this.drip.questionQuiz.correctAnswers, idx);
  }

  toggleMCAnswer = (idx: number) => {
    this.drip.questionQuiz.correctAnswers = this.editDripService
      .toggleMCAnswer(this.drip.questionQuiz.correctAnswers, idx);
  }

  markCorrectMCAnswer = (idx) => {
    this.drip.questionQuiz.correctAnswers = this.editDripService
      .markCorrectAnswer(this.drip.questionQuiz.correctAnswers, idx);
  }

  removeMCAnswer = (idx: number) => {
    this.drip.questionQuiz.correctAnswers =
      this.drip.questionQuiz.correctAnswers
        .filter((answerIdx: number) => answerIdx !== idx);
  }

  persist = () => {
    this.saveDrip.emit({ drip: this.drip });
  }

  setConsoleQuizAnswer = (payload) => {
    this.drip.consoleQuiz.answer = payload;
  };
}
