// External Dependencies
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

// AOM Dependencies

// AOM Types
import { Course } from 'server/dependencies/models/course/course';

@Component({
  templateUrl: './edit-difficulty.component.jade',
  selector: 'edit-difficulty'
})

export class EditDifficultyComponent {
  difficulties: string[] = ['Beginner', 'Medium', 'Advanced'];

  @Input()
  course: Course;

  @Output()
  emitDifficulty: EventEmitter<string> = new EventEmitter();

  constructor() {}

  setDifficulty = (difficulty: string) => {
    this.emitDifficulty.emit(difficulty);
  }
}