// External Deps
import { Injectable } from '@angular/core';

// AOM Deps
import { ApiService } from 'client/core/api/api.service';

@Injectable()

export class InstructorCourseService {
  constructor(
    private apiService: ApiService
  ) {}

  public fetchCourses() {
    return this.apiService.instructors.getCourses();
  }
}