// External Deps
import { Component, OnInit } from '@angular/core';

// AOM Deps
import { ApiService } from 'client/core/api/api.service';
import { ViewReadyService } from 'client/shared/view-ready.service';

@Component({
  selector: 'edit-module',
  templateUrl: './edit-module.component.jade'
})

export class EditModuleComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private viewState: ViewReadyService
  ) {}

  ngOnInit() {

  }

  getCourse() {
    
  }
}