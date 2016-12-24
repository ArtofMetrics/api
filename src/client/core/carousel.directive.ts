import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[aom-carousel]' })
export class CarouselDirective {
  constructor(private el: ElementRef) {
    $(this.el.nativeElement).carousel();
  }
}