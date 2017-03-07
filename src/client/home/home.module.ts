import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeCarouselComponent } from './home-carousel.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HomeComponent, HomeCarouselComponent],
  exports: [HomeComponent]
})

export class HomeModule { }