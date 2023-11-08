import { PostData } from "../../apiControllers/blogPost/apiHandleController";
import connectDb from "../../db/connectDb/connectDb";
import Course from "../../db/schema/Course";


/**
 *
 * @returns number
 *
 * serverSide course count function
 *
 *
 * normal fetch calls to the sites own server failed on build
 * this is inline with what nextjs has stated in docs
 *
 * getServerside -> is essentially runs on server only -> directly execute the server code
 *
 *
 * next -> use context prop in getserversideprops and context.query.id to the params
 *
 * id if=> [id] .. and so on
 */
export const serverSideCourse: (context: any) => Promise<any> = async (
  context
) => {
  connectDb();
  const { query, params, resolvedUrl } = context;



  let allCourseCount: number = await getCourseCountOnly();
  let allCoursesInParts: any = await getCourseInParts(params);

  return { allCourseCount, allCoursesInParts };
};

/**
 *
 * @returns number
 *
 * returns the total courses count
 *
 * always returns a number
 */
const getCourseCountOnly = async () => {
  let allCoursesCount: number | any;
  let allCount: number = 0;
  try {
    allCoursesCount = await Course.find({}).count();
    allCount = allCoursesCount as number;
  } catch (error: any) {
    allCount = 0;
  }

  return allCount;
};

/**
 *
 * @param params
 * @returns []
 *
 * sends a stringyfied [] , makes sure to json parse on the client side
 *
 * always returns a [] or string of array
 */
const getCourseInParts = async (params: any) => {
  let partNumber = params?.id;
  const itemsPerPage = 3;
  let allPosts: undefined | PostData | PostData[] | any[] | string;

  if (typeof partNumber === "undefined") {
    partNumber = 0;
  }

  if (typeof Number(partNumber) !== "number") {
    ("not all show items ?");
    allPosts = [];
    return allPosts;
  }

  try {
    allPosts = await Course.find(
      {},
      {
        bodyDelta: 0,
        authorId: 0,
        bodyHTML: 0,
        __v: 0,
      }
    )
      .sort({
        updatedAt: -1,
      })
      .skip(partNumber * itemsPerPage)
      .limit(itemsPerPage);
  } catch (error: any) {
    return [];
  }
  allPosts = await JSON.stringify(allPosts);
  return allPosts;
};
