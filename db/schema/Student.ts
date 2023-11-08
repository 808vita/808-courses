import { Schema, model, models } from "mongoose";


const progress: string[] = [ "completed", "in progress"]

const StudentSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    // enrolementStatus probably should be here 
    progress: {
      type: String,
      default: "in progress",
      enum: {
        values: progress
      },
    },
  },
  {
    timestamps: true,
  }
);

const Student = models.Student || model("Student", StudentSchema);
export default Student;
