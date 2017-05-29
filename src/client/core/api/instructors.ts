// NPM Deps
import { Observable } from 'rxjs/Observable';

// AOM Deps
import { AomHTTPService } from 'client/core/aom-http.service';
import { JWTService } from 'client/core/jwt.service';

// AOM Interfaces
import { Course } from 'server/dependencies/models/course/course';
import { CourseModule } from 'server/dependencies/models/module';
import {
  GetCoursesResponse, GetOneCourseResponse,
  UpdateCourseRequestBody, UpdateCourseResponse,
  ChangeVisibilityResponse
} from 'server/api/instructors/models';
import {
  AddModuleResponse,
  DeleteModuleRequest, DeleteModuleResponse,
  GetOneModuleResponse,
  AddNewLessonRequestBody, AddNewLessonResponse
} from 'server/api/instructors/modules/models';
import {
  GetOneLessonQuery, GetOneLessonResponse,
  AddDripRequestBody, AddDripResponse,
  UpdateDripRequestBody, UpdateDripResponse
} from 'server/api/instructors/lessons/models';

export function instructors(API_ROOT: string, http: AomHTTPService, jwtService: JWTService) {
  const BASE_URL = `${API_ROOT}/instructors`;

  return {
    getCourse({ slug }): Observable<GetOneCourseResponse> {
      return http
        .get(`${BASE_URL}/course/${slug}`);
    },

    getCourses(): Observable<GetCoursesResponse> {
      return http
        .get(`${BASE_URL}/courses`);
    },

    addModule({ slug, module, language }: { slug: string, module, language: string }): Observable<AddModuleResponse> {
      return http
        .post(`${BASE_URL}/course/${slug}/module`, { module, language });
    },

    getModule({ slug, moduleId, language }: { slug: any, moduleId: string, language?: string }): Observable<GetOneModuleResponse> {
      return http
        .get(`${BASE_URL}/course/${slug}/module/${moduleId}`,
        { language })
        .catch(error => Observable.throw(error));
    },

    deleteModule({ slug, moduleId, language }: { slug: string, moduleId: string, language: string }): Observable<DeleteModuleResponse> {
      return http
        .delete(`${BASE_URL}/course/${slug}/language/${language}/module/${moduleId}`);
    },

    addNewLesson({ slug, moduleId, newLesson, language }: { slug: any, moduleId: string, newLesson: any, language: string }): Observable<AddNewLessonResponse> {
      const data: AddNewLessonRequestBody = { lesson: newLesson, language };
      return http
        .post(
        `${BASE_URL}/course/${slug}/module/${moduleId}/lesson`,
        data);
    },

    deleteLesson({ slug, moduleId, lessonId, language }:
      { slug: string, moduleId: string, lessonId: string, language: string }): Observable<any> {
      return http
        .delete(
        `${BASE_URL}/course/${slug}/language/${language}/module/${moduleId}/lesson/${lessonId}`);
    },
    getLesson({ slug, moduleId, lessonId, language }: { slug: string, moduleId: string, lessonId: string, language: string }): Observable<GetOneLessonResponse> {
      const query: GetOneLessonQuery = { language };
      return http
        .get(
        `${BASE_URL}/course/${slug}/module/${moduleId}/lesson/${lessonId}`,
        query);
    },
    addDrip({ slug, moduleId, lessonId, language }: { slug: string, moduleId: string, lessonId: string, language: string }): Observable<AddDripResponse> {
      const data: AddDripRequestBody = { language };
      return http
        .post(
        `${BASE_URL}/course/${slug}/module/${moduleId}/lesson/${lessonId}/drip`,
        { language });
    },
    deleteDrip({ slug, moduleId, lessonId, dripId, language }:
      { slug: string, moduleId: string, lessonId: string, dripId: string, language: string }): Observable<any> {
      return http
        .delete(`${BASE_URL}/course/${slug}/language/${language}/module/${moduleId}/lesson/${lessonId}/drip/${dripId}`);
    },
    saveDrip({ slug, moduleId, lessonId, drip, language }: { slug: string, moduleId: string, lessonId: string, drip: any, language: string }): Observable<UpdateDripResponse> {
      const data: UpdateDripRequestBody = { drip, language };
      return http
        .put(
        `${BASE_URL}/course/${slug}/module/${moduleId}/lesson/${lessonId}/drip/${drip._id}`,
        data);
    },
    saveCourse({ course, slug }: { course: any, slug: string }): Observable<UpdateCourseResponse> {
      const data: UpdateCourseRequestBody = { course };

      return http
        .put(
        `${BASE_URL}/course/${slug}`,
        data
        );
    },
    toggleVisibility({ course }: { course: Course }): Observable<ChangeVisibilityResponse> {
      return http
        .post(`${BASE_URL}/course/${course.slug}/visibility`);
    }
  };
}
