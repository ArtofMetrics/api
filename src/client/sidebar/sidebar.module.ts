// NPM Deps
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Our Deps
import CoreModule from 'client/core/core.module';
import { SidebarComponent } from './sidebar.component';
import { SidebarToggleComponent } from './sidebar-toggle.component';
import { SidebarStateService } from './sidebar-state.service';

@NgModule({
  imports: [CommonModule, RouterModule, CoreModule],
  declarations: [SidebarComponent, SidebarToggleComponent],
  providers: [SidebarStateService],
  exports: [SidebarComponent, SidebarToggleComponent]
})

export class SidebarModule {}