import { Schema, model, models } from "mongoose";

const LikeSchema = new Schema(
  {
    likeerId: {
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

const Like = models.Like || model("Like", LikeSchema);
export default Like;
