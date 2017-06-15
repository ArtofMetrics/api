// NPM Deps
import { Component, OnInit } from '@angular/core';

// Our Deps

@Component({
  selector: 'aom-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.jade',
  styleUrls: ['./sidebar-toggle.component.styl']
})

export class SidebarToggleComponent implements OnInit {
  SELECTOR = '#sidebar-toggle-button';

  constructor() {}

  ngOnInit() {
    $(this.SELECTOR).sideNav({
      edge: 'left',
      closeOnClick: true,
      draggable: true
    });
  }

  showBar = () => {
    $(this.SELECTOR).click();
  }
}