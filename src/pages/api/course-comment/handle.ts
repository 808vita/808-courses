// handle
//post -  comment
//pass protected - all roles allowed


import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { apiCreateCourseComment } from "../../../../apiControllers/courseComment/apiHandleController";

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * 
 * pass protected 
 * all accounts can post comments
 */
export default async function blogCommentHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   *  get session for api route protection
   */
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    // if valid session does not exist
    res.status(401).json({ message: "You must be logged in." });
    return;
  }


  if (req.method !== "POST") {
    return res.status(400).json({ error: "POST methods only", session });
  }

  if (req.method === "POST") {
    // console.log(req.body);
    apiCreateCourseComment(req, res);
  }
  return
}

