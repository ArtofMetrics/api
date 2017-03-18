// NPM Deps
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
// Our Deps
import { SidebarComponent } from './sidebar.component';
import { SidebarLinksService } from './sidebar-links.service';
import { SidebarToggleComponent } from './sidebar-toggle.component';

@NgModule({
  imports: [RouterModule],
  declarations: [SidebarComponent, SidebarToggleComponent],
  exports: [SidebarComponent, SidebarToggleComponent]
})

export class SidebarModule {}