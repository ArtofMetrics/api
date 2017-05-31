// External Dependencies
import { Component, OnInit } from '@angular/core';

// AOM Dependencies
import { ApiService } from 'client/core/api/api.service';
import { ErrorService } from 'client/core/error.service';
import { ViewReadyService } from 'client/shared/view-ready.service';
import { userSchema } from 'server/dependencies/models/user';

// AOM Interfaces
import { IUser } from 'server/dependencies/models/user/user.model';

@Component({
  selector: 'admin-users-dashboard',
  templateUrl: './users-dashboard.component.jade'
})

export class UsersDashboardComponent implements OnInit {
  users: IUser[];

  constructor(
    private apiService: ApiService,
    private errorService: ErrorService,
    private viewState: ViewReadyService
  ) {}

  ngOnInit() {
    this.viewState.emitFinished();
  }

  handleHttpError = (error: Error) => {
    this.errorService.handleHttpError(error);
  }
}
