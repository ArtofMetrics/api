// NPM Deps
import { NgModule } from '@angular/core';

// AOM Services
import { ViewReadyService } from './view-ready.service';

@NgModule({
  providers: [ViewReadyService]
})

export class SharedModule { }