import connectDb from "../../db/connectDb/connectDb";

import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

import Comment from "../../db/schema/Comment";
import Student from "../../db/schema/Student";

interface CommentData {
  commentContent: string;
  commenterId: string;
  postId: string;
  email: string
}

interface ErrorData {
  message: string;
}

export const apiJoinCourse = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  connectDb();

  const { studentId,
    courseId, } = req.body;
  let newComment: undefined | CommentData | any[];
  const progress = "in progress"

  if (studentId === "" || courseId === "") {
    return res.status(400).json({ error: "fill all fields" });
  }

  if (
    !mongoose.isValidObjectId(courseId) ||
    !mongoose.isValidObjectId(studentId)
  ) {
    return res.status(400).json({ error: "send valid object id" });
  }

  try {
    newComment = await Student.create({ courseId, studentId, progress });
  } catch (error: ErrorData | any) {
    // console.log(error);
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(newComment);
};
