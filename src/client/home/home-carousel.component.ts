import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-carousel',
  templateUrl: './home-carousel.component.jade',
  styleUrls: ['./home-carousel.component.styl']
})

export class HomeCarouselComponent implements OnInit {

  carouselId: string = '#home-carousel';

  constructor() { }
  ngOnInit() {
    setTimeout(() => {
      try {
        $('#home-carousel').carousel();
      } catch (error) {
        console.error(`Error in carousel`);
        console.error(`Error: ${ error }\n${ error.stack }`)
      }
    }, 2000)
  }
}