import { ObjectId, Schema, model, models } from "mongoose";

`
Course name
Instructor's name
Description
Enrollment status (e.g., 'Open', 'Closed', 'In Progress')
Course duration
Schedule
Location
Pre-requisites
Syllabus as an expandable item

`;
export interface appState {
  [key: string]: any;
}

export interface ICourseDocument extends Document {
  title: string;
  description: string;
  enrollementStatus: string;
  duration: string;
  loc: string;
  schedule:string;
  requisites: any;
  syllabus: {
    [key: string]: any;
  };
  instructorId: ObjectId;
}



const CourseSchema = new Schema<ICourseDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    enrollementStatus: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    loc: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    requisites: {
      type: Object,
      required: true,
    },
    syllabus: {
      type: Object,
      required: true,
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = models.Course || model("Course", CourseSchema);
export default Course;
