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
      answers: [],
      correctAnswers: []
    };
  }

  addQuestionQuizAnswer = () => {
    this.drip.questionQuiz.answers.push('');
  }

  isCorrectMCAnswer = (idx: number): boolean => {
    const isCorrect = this.drip.questionQuiz.correctAnswers
      .filter((answerIdx: number) => answerIdx === idx)
      .length > 0;
    console.log('is correct', idx, isCorrect);

    return isCorrect;
  }

  toggleMCAnswer = (idx: number) => {
    if (this.isCorrectMCAnswer(idx)) {
      // console.log('marking incorrect')
      this.removeMCAnswer(idx)
    } else {
      // console.log('marking correct')
      this.markCorrectMCAnswer(idx);
    }
    
    // console.log(this.drip.questionQuiz);
  }

  markCorrectMCAnswer = (idx) => {
    this.drip.questionQuiz.correctAnswers.push(idx);
  }

  removeMCAnswer = (idx: number) => {
    this.drip.questionQuiz.correctAnswers =
      this.drip.questionQuiz.correctAnswers
        .filter((answerIdx: number) => answerIdx !== idx);
  }

  persist = () => {
    this.saveDrip.emit({ drip: this.drip });
  }
  
}