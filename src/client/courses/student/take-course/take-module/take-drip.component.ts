// External Dependencies
import { Component, Input, OnInit } from '@angular/core';

// AOM Dependencies

// AOM Interfaces
import { Drip } from 'server/dependencies/models/module/drip';

@Component({
  selector: 'take-drip',
  templateUrl: './take-drip.component.jade'
})

export class TakeDripComponent {
  @Input()
  drip: Drip;

}
