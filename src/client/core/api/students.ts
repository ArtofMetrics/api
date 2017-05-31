// External Dependencies
import { Observable } from 'rxjs/Observable';

// AOM Dependencies
import { AomHTTPService } from 'client/core/aom-http.service';

// AOM Interfaces
import { StudentCourse } from 'server/dependencies/models/course/student-course';

import {
  GetOneCourseResponse,
  SubscribeToCourseResponse, SubscribeToCourseRequestBody,
  SubmitDripRequestBody, SubmitDripResponse,
  GetCoursesResponse
} from 'server/api/students/models';

export function students(API_ROOT: string, http: AomHTTPService) {
  const BASE_URL = `${API_ROOT}/students`;

  return {

    getSubscribedCourses(): Observable<GetCoursesResponse> {
      return http
        .get(`${BASE_URL}/courses`);
    },

    getCourseBySlug({ slug }: { slug: string }): Observable<GetOneCourseResponse> {
      return http
        .get(`${BASE_URL}/course/${slug}`);
    },

    subscribeToCourse({ courseId, cardDetails, language }: { courseId: string, cardDetails?: any, language: string }): Observable<SubscribeToCourseResponse> {
      const data: SubscribeToCourseRequestBody = { cardDetails, language };
      return http
        .post(`${BASE_URL}/course/${courseId}`, data);
    },

    submitDrip({ language, completed, courseId }: { language: string, completed: string, courseId }): Observable<SubmitDripResponse> {
      const data: SubmitDripRequestBody = { language, completed };

      return http
        .post(`${BASE_URL}/course/${courseId}/answer`, data);
    },

    changeActiveLanguage({ course, language }) {
      const data = { language };

      return http
        .post(`${BASE_URL}/course/${course._id.toString()}/language`, data);
    },

    resetCourse({ course }: { course: StudentCourse }) {
      return http
        .post(`${ BASE_URL }/course/${ course._id.toString() }/reset`);
    }
  };
}
