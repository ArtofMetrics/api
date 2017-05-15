// External Dependencies
import { Injectable } from '@angular/core';

// AOM Dependencies
import { ApiService } from 'client/core/api/api.service';

// AOM Interfaces

@Injectable()
export class UsersDashboardService {
  constructor(
    private apiService: ApiService) {}
}
