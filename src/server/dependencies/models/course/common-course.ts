// External Dependencies

// AOM Dependencies
import { courseModuleSchema } from '../module';

export const commonCourseProps = {
  data: {
    name: { type: String, required: true },
    category: { type: String },
    photos: [
      {
        url: { type: String, required: true },
        caption: { type: String },
        isCover: { type: Boolean, default: false, required: true }
      }
    ],
    modules: {
      R: [courseModuleSchema],
      STATA: [courseModuleSchema]
    }
  }
};
