// External Dependencies
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as includes from 'lodash/includes';

// AOM Dependencies
import { ToastService } from 'client/core/toast.service';

// AOM Interfaces
import { Drip } from 'server/dependencies/models/module/drip';
import { CheckedAnswer } from 'server/dependencies/models/module/question-quiz';

@Component({
  selector: 'take-drip',
  templateUrl: './take-drip.component.jade',
  styleUrls: ['./take-drip.component.styl', '../../../shared/text-editor.styl']
})

export class TakeDripComponent {
  @Input()
  drip: Drip;

  @Output()
  moveOn: EventEmitter<any> = new EventEmitter();

  potentialAnswers: Set<number> = new Set();
  grade: CheckedAnswer;
  consoleQuizAnswer: string = '';

  constructor(
    private toastService: ToastService
  ) {}

  markQuestionQuizAnswer = (idx: number) => {
    this.potentialAnswers.has(idx) ?
      this.potentialAnswers.delete(idx) :
      this.potentialAnswers.add(idx);
    if (this.grade) {
      this.gradeAnswers();
    }

  };

  gradeAnswers = () => {
    this.grade = this.drip.questionQuiz.checkAnswers(Array.from(this.potentialAnswers));
    if (this.grade.passed) {
      this.toastService.toast(`Congrats. You answered the quiz successfuly!`);

    } else if (this.grade.missingAnswers) {
      this.toastService.toast(`Oops, it looks like you're missing some answers!`);
    } else if (this.grade.incorrectAnswers) {
      this.toastService.toast(`Oops, it looks like some of your answers are incorrect!`);
    }
  }
  submitQuestionQuizAnswers = () => {
    this.gradeAnswers();
    if (this.grade.passed && !this.drip.consoleQuiz) {
      this.moveOn.emit();
    }
  };

  isIncorrect = (idx: number) => {
    return this.grade && this.grade.incorrectAnswers && this.grade.incorrectAnswers.has(idx);
  };

  isMissing = (idx: number) => {
    return this.grade && this.grade.missingAnswers && this.grade.missingAnswers.has(idx);
  };

  submitConsoleQuiz = (answer: string) => {
    if (answer.trim() === this.drip.consoleQuiz.answer) {
      this.toastService.toast(`You answered the quiz correctly!`);
      this.moveOn.emit();
    } else {
      this.toastService.toast(`Oops, not quite correct!`);
    }
  };

  setConsoleQuizAnswer = (payload: string) => {
    this.consoleQuizAnswer = payload;
  };

  configureEditor = (editor) => {
    const self = this;

    ['shift-enter', 'ctrl-enter', 'enter'].forEach(cmd => {
      editor.commands.addCommand({
        name: "submitQuiz",
        exec: function() {
          self.submitConsoleQuiz(self.consoleQuizAnswer);
        },
        bindKey: {mac: cmd, win: cmd}
      });
    });

  }
}
