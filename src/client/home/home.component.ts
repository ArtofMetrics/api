// NPM Deps
import { Component, OnInit } from '@angular/core';

// AOM Deps
import { ViewReadyService } from 'client/shared/view-ready.service';
import { ApiService } from 'client/core/api/api.service';

@Component({
  selector: 'home',
  templateUrl: './home.jade',
  styleUrls: ['./home.styl']
})

export class HomeComponent implements OnInit {
  courses: any[];
  
  constructor(private viewState: ViewReadyService, 
              private apiService: ApiService) { }
  ngOnInit() {
    const self = this;

    self.viewState.emitFinished();
    
    // Fetch courses
    const subscription = self.apiService.courses
      .getCourses()
      .subscribe(courses => {
        self.courses = courses;
        subscription.unsubscribe();
      });
  }

  viewCourse(course) {
    
  }
}