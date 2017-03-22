// External Deps
import { Injectable } from '@angular/core';

// AOM Deps
import { ApiService } from 'client/core/api/api.service';

@Injectable()
export class EditCourseService {
  constructor(
    private apiService: ApiService
  ) {}
  
  public getCourse = ({ slug }: { slug: string }) => {

  };
}