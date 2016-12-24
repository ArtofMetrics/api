import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeCarouselComponent } from './home-carousel.component';

@NgModule({
  declarations: [HomeComponent, HomeCarouselComponent],
  exports: [HomeComponent]
})

export class HomeModule { }