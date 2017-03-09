// NPM Deps
import { NgModule } from '@angular/core'

// Our Deps
import { SidebarComponent } from './sidebar.component';
import { SidebarToggleComponent } from './sidebar-toggle.component';

@NgModule({
  declarations: [SidebarComponent, SidebarToggleComponent],
  exports: [SidebarComponent, SidebarToggleComponent]
})

export class SidebarModule {}