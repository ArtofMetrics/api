// NPM Deps
import { Observable } from 'rxjs/Observable';

// AOM Deps
import { AomHTTPService } from 'client/core/aom-http.service';
import { JWTService } from 'client/core/jwt.service';

// AOM Interfaces
import { CourseModule } from 'server/dependencies/models/module';
import { GetCoursesResponse, GetOneCourseResponse } from 'server/api/instructors/models';
import { AddModuleResponse, GetOneModuleResponse } from 'server/api/instructors/modules/models';

export function instructors(API_ROOT: string, http: AomHTTPService, jwtService: JWTService) {
  const BASE_URL = `${ API_ROOT }/instructors`;

  return {
    getCourse({ slug }): Observable<GetOneCourseResponse> {
      return http
        .get(`${ BASE_URL }/course/${ slug }`);
    },

    getCourses(): Observable<GetCoursesResponse> {
      return http
        .get(`${ BASE_URL }/courses`);
    },

    addModule({ slug, module, language }: { slug: string, module, language: string }): Observable<AddModuleResponse> {
      return http
        .post(`${ BASE_URL }/course/${ slug }/module`, { module, language });
    },

    getModule({ slug, moduleId, language }: { slug: any, moduleId: string, language: string }): Observable<GetOneModuleResponse> {
      return http
        .get(`${ BASE_URL }/course/${ slug }/module/${ moduleId }`, 
          { language })
        .catch(error => Observable.throw(error));
    },

    addNewLesson({ slug, moduleId, newLesson, language }: { slug: any, moduleId: string, newLesson: any, language: string }): Observable<any> {
      return http
        .post(
          `${ BASE_URL }/course/${ slug }/module/${ moduleId }/lesson`, 
          { lesson: newLesson, language });
    },

    deleteLesson({ slug, moduleId, lessonId, language }: { slug: string, moduleId: string, lessonId: string, language: string }): Observable<any> {
      return http
        .delete(
          `${ BASE_URL }/course/${ slug }/module/${ moduleId }/lesson/${ lessonId }`,
          { language });
    },
    getLesson({ slug, moduleId, lessonId, language }: { slug: string, moduleId: string, lessonId: string, language: string }): Observable<any> {
      return http
        .get(
          `${ BASE_URL }/course/${ slug }/module/${ moduleId }/lesson/${ lessonId }`,
          { language });
    },
    addDrip({ slug, moduleId, lessonId, language }: { slug: string, moduleId: string, lessonId: string, language: string }): Observable<any> {
      return http
        .post(
          `${ BASE_URL }/course/${ slug }/module/${ moduleId }/lesson/${ lessonId }/drip`,
          { language });
    },
    deleteDrip({ slug, moduleId, lessonId, dripId, language }: { slug: string, moduleId: string, lessonId: string, dripId: string, language: string }): Observable<any> {
      return http
        .delete(
          `${ BASE_URL }/course/${ slug }/module/${ moduleId }/lesson/${ lessonId }/drip/${ dripId }`,
          { language });
    },
    saveDrip({ slug, moduleId, lessonId, drip, language }: { slug: string, moduleId: string, lessonId: string, drip: any, language: string }): Observable<any> {
      console.log('UPDATING', drip);
      return http
        .put(
          `${ BASE_URL }/course/${ slug }/module/${ moduleId }/lesson/${ lessonId }/drip/${ drip._id }`,
          { drip, language });
    },
    // saveModule({ slug, module }: { slug: string, module: CourseModule }): Observable<any> {
    //   return http
    //     .put(`${ BASE_URL }/course/${ slug }/module/${ module._id }`)
    // }
  };
}