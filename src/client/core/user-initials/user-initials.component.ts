// External Dependencies
import { Component, OnInit, Input } from '@angular/core';

// AOM Dependencies

// AOM Types
import { IUser } from 'server/dependencies/models/user/user.model';

@Component({
  selector: 'user-initials',
  templateUrl: './user-initials.component.jade',
  styleUrls: ['./user-initials.component.styl']
})

export class UserInitialsComponent {
  @Input()
  user: IUser;
}