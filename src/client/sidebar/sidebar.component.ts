// NPM Deps
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'aom-sidebar',
  templateUrl: './sidebar.component.jade',
  encapsulation: ViewEncapsulation.None
})


export class SidebarComponent implements OnInit {
  NAV_SELECTOR: string = `#aom-sidebar`;

  constructor() { }

  ngOnInit() {
    console.log('running side nav')
    // $(this.NAV_SELECTOR).sideNav('show');
  }
}