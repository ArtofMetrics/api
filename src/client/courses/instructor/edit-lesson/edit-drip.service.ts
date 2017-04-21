// External Dependencies
import { Injectable } from '@angular/core';

@Injectable()
export class EditDripService {
  constructor() {}

  public toggleMCAnswer = (correctAnswers: number[], idx: number) => {
    return this.isCorrectMCAnswer(correctAnswers, idx)
      ? this.removeMCAnswer(correctAnswers, idx)
      : this.markCorrectAnswer(correctAnswers, idx);
  }

  public markCorrectAnswer = (correctAnswers: number[], idx: number): number[] => {
    return Array.from(new Set([...correctAnswers, idx]));
  }

  public isCorrectMCAnswer = (correctAnswers: number[], idx: number): boolean => {
    return correctAnswers
      .filter((answerIdx: number) => answerIdx === idx)
      .length > 0;
  }

  public removeMCAnswer = (correctAnswers: number[], idx: number): number[] => {
    return correctAnswers.filter((answerIdx: number) => answerIdx !== idx);
  }
}