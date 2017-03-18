import { Injectable } from '@angular/core';
import { TopMenuLinkConfig } from './top-menu-link-config.model';
import { TopMenuLink } from './top-menu-link.model';

@Injectable()
export default class TopMenuService {
  public fetchLinks = (): TopMenuLink[] => this.DEFAULT_LINKS;

  private DEFAULT_LINKS: TopMenuLink[] = [
    {
      href: `/login`,
      name: 'Login'
    },
    {
      href: `/register`,
      name: `Register`
    }
  ];
};
