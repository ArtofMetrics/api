// NPM Deps
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as findIndex from 'lodash/findIndex';

// Our Deps
import { UserService } from 'client/core/user.service';
import { SidebarStateService } from './sidebar-state.service';
import { Lesson } from 'server/dependencies/models/module/lesson';
import { CourseModule } from 'server/dependencies/models/module';

@Component({
  selector: 'aom-sidebar',
  templateUrl: './sidebar.component.jade',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./sidebar.component.styl']
})


export class SidebarComponent implements OnInit {
  NAV_SELECTOR: string = `#aom-sidebar`;

  constructor(
    private userService: UserService,
    private router: Router,
    private sidebar: SidebarStateService) { }

  ngOnInit() {
  }

  public logout = () => {
    this.userService.logout();
    this.router.navigate(['/register']);
  };

  loadLesson = (lesson: Lesson) => {
    this.sidebar.loadLesson({ lesson });
  };

  isFutureModule = (moduleIdx: number) => {
    const { module: idxOfActiveModule } = this.sidebar
      .course
      .parseLastCompleted({ language: this.sidebar.course.data.activeLanguage });
    const modules = this.sidebar
      .course.data.modules[this.sidebar.course.data.activeLanguage];
    

    return moduleIdx > idxOfActiveModule;
  };

  isFutureLesson = ({ moduleIdx, lessonIdx }: { moduleIdx: number, lessonIdx: number }) => {
    if (this.isFutureModule(moduleIdx)) {
      return true;
    }

    const language = this.sidebar.course.data.activeLanguage;
    const { lesson: idxOfActiveLesson } = this.sidebar
      .course
      .parseLastCompleted({ language });
    
    const lessons = this.sidebar.course.getActiveModule({ language }).lessons;

    return lessonIdx > idxOfActiveLesson;
  };
}