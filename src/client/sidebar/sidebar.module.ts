// NPM Deps
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';

// Our Deps
import { SidebarComponent } from './sidebar.component';
import { SidebarToggleComponent } from './sidebar-toggle.component';
import { SidebarStateService } from './sidebar-state.service';

@NgModule({
  imports: [CommonModule],
  declarations: [SidebarComponent, SidebarToggleComponent],
  providers: [SidebarStateService],
  exports: [SidebarComponent, SidebarToggleComponent]
})

export class SidebarModule {}