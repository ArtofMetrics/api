// NPM Deps
import { NgModule } from '@angular/core'

// Our Deps
import { SidebarComponent } from './sidebar.component';
import { SidebarToggleComponent } from './sidebar-toggle.component';
import { SidebarStateService } from './sidebar-state.service';

@NgModule({
  declarations: [SidebarComponent, SidebarToggleComponent],
  providers: [SidebarStateService],
  exports: [SidebarComponent, SidebarToggleComponent, SidebarStateService]
})

export class SidebarModule {}