import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import { Session } from "next-auth";
import {
  apiCreateCourse,
  apiGetAllCurrentEnrolledCourses,
  apiMarkComplete,
} from "../../../../apiControllers/course/apiHandleController";

const secret = process.env.NEXTAUTH_JWT_SECRET;

export interface IUserSessionData {
  email: string;
  role: string;
  createdAt: string;
  _id: string;
}
export interface IUserSession extends Session {
  user: IUserSessionData;
}

export default async function courseHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   *  get session for api route protection
   */
  const session: IUserSession | null = (await getServerSession(
    req,
    res,
    authOptions
  )) as IUserSession;

  if (!session) {
    // if valid session does not exist
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (!["admin", "instructor","student"].includes(session?.user?.role)) {
    // if curent user not an admin or author
    // catch them
    res.status(401).json({
      message: "only admin / author accoutns allowed",
      session,
    });
    return;
  }

  if (req.method === "GET") {
    // get all currently enrolled courses
    apiGetAllCurrentEnrolledCourses(req, res, session);
  }

  if (req.method === "PUT") {
    // mark a enrolled course to completed
    apiMarkComplete(req, res, session);

  }

  if (req.method === "POST") {
    // console.log(req.body);
    //create courses 
    apiCreateCourse(req, res);
  }
  return 

}
