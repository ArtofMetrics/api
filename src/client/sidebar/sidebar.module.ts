// NPM Deps
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
// Our Deps
import { SidebarComponent } from './sidebar.component';
import { SidebarLinksService } from './sidebar-links.service';
import { SidebarToggleComponent } from './sidebar-toggle.component';
import { SidebarStateService } from './sidebar-state.service';

@NgModule({
  imports: [RouterModule],
  declarations: [SidebarComponent, SidebarToggleComponent],
  providers: [SidebarStateService],
  exports: [SidebarComponent, SidebarToggleComponent, SidebarStateService]
})

export class SidebarModule {}