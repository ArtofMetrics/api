import { Injectable } from '@angular/core';
import { TopMenuLinkConfig } from './top-menu-link-config.model';
import { TopMenuLink } from './top-menu-link.model';

@Injectable()
export default class TopMenuService {
  public fetchLinks(config: TopMenuLinkConfig): TopMenuLink[] {
    const sharedLinks = this.DEFAULT_LINKS;
    if (!config.isLoggedIn) {
      return sharedLinks.concat(this.UNAUTH_LINKS);
    } else if (config.isAdmin) {
      return sharedLinks.concat(this.ADMIN_LINKS);
    } else if (config.isInstructor) {
      return sharedLinks.concat(this.INSTRUCTOR_LINKS);
    } else if (config.isStudent) {
      return sharedLinks.concat(this.STUDENT_LINKS);
    } else {
      return sharedLinks;
    }
  }

  private ADMIN_LINKS: TopMenuLink[] = [
    {
      href: '/admin',
      name: 'Admin'
    },
  ];

  private INSTRUCTOR_LINKS: TopMenuLink[] = [
    {
      href: '/instructor/courses',
      name: 'My Courses'
    }
  ];

  private STUDENT_LINKS: TopMenuLink[] = [
    {
      href: '/student/courses',
      name: 'My Courses'
    }
  ];

  private UNAUTH_LINKS: TopMenuLink[] = [
    {
      href: '/login',
      name: 'Login'
    },
    {
      href: '/register',
      name: 'Register'
    }
  ];

  private DEFAULT_LINKS: TopMenuLink[] = [
    {
      href: '/courses',
      name: 'Courses'
    },
    {
      href: '/profile',
      name: 'Profile'
    }
  ];

  public links: TopMenuLink[] = [
    {
      href: '/courses',
      name: 'Courses'
    },
    {
      href: '/profile',
      name: 'Profile'
    }
  ]
};
