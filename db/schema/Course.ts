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

`
export interface ICourseDocument extends Document {
  title: string;
  description: string;
  enrollementStatus: string;
  duration: string;
  loc: string;
  requisites: string;
  syllabus: string;
  instructorId: ObjectId;
}

const enrollementStatus: string[] = ["Open", "Closed", "In Progress"]

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
      default: "Open",
      enum: {
        values: enrollementStatus
      },
    },
    duration: {
      type: String,
      required: true,
    },
    loc: {
      type: String,
      required: true,
    },
    requisites: {
      type: String,
      required: true,
    },
    syllabus: {
      type: String,
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
