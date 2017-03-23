// External Deps
import { Injectable } from '@angular/core';

// AOM Deps
import { ApiService } from 'client/core/api/api.service';

// AOM Interfaces
import { CourseModule } from 'server/dependencies/models/module';

@Injectable()
export class EditCourseService {
  constructor(
    private apiService: ApiService
  ) {}
  
  public getCourse = ({ slug }: { slug: string }) => {
    return this.apiService.instructors.getCourse({ slug });
  };

}