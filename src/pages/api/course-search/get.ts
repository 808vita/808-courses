//server side regex ?

import type { NextApiRequest, NextApiResponse } from "next";

import { apiSearchCourse } from "../../../../apiControllers/courseSearch/apiHandlerController";

export default async function blogSearchHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    apiSearchCourse(req, res);
  }

  if (req.method !== "POST") {
    return res.status(400).json({
      msg: "only POST requests",
    });
  }
}
