import { Schema, model, models } from "mongoose";


const enrollementStatus: string[] = ["Open", "Closed", "In Progress"]

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
    enrollementStatus: {
      type: String,
      default: "Open",
      enum: {
        values: enrollementStatus
      },
    },
  },
  {
    timestamps: true,
  }
);

const Student = models.Student || model("Student", StudentSchema);
export default Student;
