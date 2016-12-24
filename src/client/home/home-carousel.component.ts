import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-carousel',
  templateUrl: './home-carousel.component.jade',
  styleUrls: ['./home-carousel.component.styl']
})

export class HomeCarouselComponent implements OnInit {

  carouselId: string = '#home-carousel';

  constructor() {}
  ngOnInit() {
    setTimeout(() => {
      $('#home-carousel').carousel();

    }, 2000)
  }
}