import connectDb from "../../db/connectDb/connectDb";
import Post from "../../db/schema/Post";
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { PostData } from "../blogPost/apiHandleController";
import Course from "../../db/schema/Course";

export const apiSearchCourse = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  connectDb();

  const { searchText } = req.body;
  // console.log(searchText);

  if (searchText === "") {
    return res.status(400).json({ error: "fill all fields" });
  }
  let allPosts: undefined | PostData | PostData[] | any[];
  try {
    // allPosts = await Post.find({}).sort({
    //   updatedAt: -1,
    // });

    allPosts = await Course.find({
      $or: [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
        { bodyHTML: { $regex: searchText, $options: "i" } },
        { enrollementStatusbodyHTML: { $regex: searchText, $options: "i" } },
        { loc: { $regex: searchText, $options: "i" } },

        { instructor: { $regex: searchText, $options: "i" } },

        { requisites: { $regex: searchText, $options: "i" } },
        { syllabus: { $regex: searchText, $options: "i" } },

      ],
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(allPosts);
};
