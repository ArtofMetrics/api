// External Dependencies
import { Component, OnInit } from '@angular/core';

// AOM Dependencies
import { AdminApiService } from 'client/admin/admin-api/admin-api.service';
import { ErrorService } from 'client/core/error.service';
import { ViewReadyService } from 'client/shared/view-ready.service';
import { userSchema } from 'server/dependencies/models/user';
import { ToastService } from 'client/core/toast.service';

// AOM Interfaces
import { IUser, Role } from 'server/dependencies/models/user/user.model';

@Component({
  selector: 'admin-users-dashboard',
  templateUrl: './users-dashboard.component.jade'
})

export class UsersDashboardComponent implements OnInit {
  users: IUser[];

  constructor(
    private adminApiService: AdminApiService,
    private errorService: ErrorService,
    private viewState: ViewReadyService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.adminApiService.users.getUsers()
      .subscribe(
        data => {
          this.users = data.users.map(user => new mongoose.Document(user, userSchema));
        },
        error => this.handleHttpError(error)
      )
    this.viewState.emitFinished();
  }

  handleHttpError = (error: Error) => {
    this.errorService.handleHttpError(error);
  }

  makeRole = (user: IUser, role: Role) => {
    this.adminApiService.users.editRole({ user, role })
      .subscribe(
        data => {
          user.roles.push(role);
          this.toastService.toast(`Successfully made ${ user.fullName() } a ${ role }`);
        },
        error => {
          this.toastService.toast(`Oops there was an error updating ${ user.fullName() }`);
          this.handleHttpError(error);
        }
      );
  };

  removeRole = (user: IUser, role: Role) => {
    this.adminApiService.users.editRole({ user, role, remove: true })
      .subscribe(
        data => {
          user.roles = user.roles.filter(r => r !== role );
          this.toastService.toast(`Successfully removed ${ role } role from ${ user.fullName() }`);
        },
        error => {
          this.toastService.toast(`Oops there was an error updating ${ user.fullName() }`);
          this.handleHttpError(error);
        }
      );
  }
}
