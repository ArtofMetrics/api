import { Component, Input } from '@angular/core';
import { TopMenuLink } from './top-menu-link.model';
import TopMenuService from './top-menu.service';
import { UserService } from 'client/core/user.service';
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
    private userService: UserService) {
    const self = this;
    this.links = topMenuService.fetchLinks({ 
      isAdmin: userService.isAdmin(),
      isLoggedIn: userService.isLoggedIn(),
      isInstructor: userService.isInstructor(),
      isStudent: userService.isStudent()
    });
  }

  public isLoggedIn() {
    return this.userService.isLoggedIn();
  }
}