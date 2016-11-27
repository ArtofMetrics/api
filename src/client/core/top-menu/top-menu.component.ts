import { Component, Input } from '@angular/core';
import { TopMenuLink } from './top-menu-link.model';
import TopMenuService from './top-menu.service';
import UserService from '../user.service';

@Component({
  selector: `top-menu`,
  templateUrl: './top-menu.component.jade',
  styleUrls: ['./top-menu.component.styl']
})
export default class TopMenuComponent {
  links: TopMenuLink[];
  @Input() title = '';
  constructor(private topMenuService: TopMenuService, private auth: UserService) {
    this.links = topMenuService.fetchLinks({ 
      isAdmin: auth.isAdmin(),
      isLoggedIn: auth.isLoggedIn(),
      isInstructor: auth.isInstructor(),
      isStudent: auth.isStudent()
    });
  }


}