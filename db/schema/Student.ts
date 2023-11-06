import { Schema, model, models } from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

const Student = models.Student || model("Student", StudentSchema);
export default Student;
