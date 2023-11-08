import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    commenterId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    commentContent: {
      type: String,
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    email:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Comment = models.Comment || model("Comment", CommentSchema);
export default Comment;
