import { Component, Input } from '@angular/core';
import { TopMenuLink } from './top-menu-link.model';
import TopMenuService from './top-menu.service';
import UserService from 'client/core/user.service';
@Component({
  selector: `top-menu`,
  templateUrl: './top-menu.component.jade',
  styleUrls: ['./top-menu.component.styl']
})
export default class TopMenuComponent {
  links: TopMenuLink[];
  homeHref = '/';
  @Input() title = '';
  
  constructor(
    private topMenuService: TopMenuService, 
    private auth: UserService) {
    const self = this;
    this.links = topMenuService.fetchLinks({ 
      isAdmin: auth.isAdmin(),
      isLoggedIn: auth.isLoggedIn(),
      isInstructor: auth.isInstructor(),
      isStudent: auth.isStudent()
    });
  }

  public isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}