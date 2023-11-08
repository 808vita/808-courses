import { PostData } from "../../apiControllers/blogPost/apiHandleController";
import connectDb from "../../db/connectDb/connectDb";
import Post from "../../db/schema/Post";
import Comment from "../../db/schema/Comment";
import Course from "../../db/schema/Course";
import Student from "../../db/schema/Student";

/**
 *
 * @returns fullBlogPostData allCurrentCommentData
 *
 * serverSide blog count function
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
export const serverSideSingleCourse: (context: any) => Promise<any> = async (
  context
) => {
  connectDb();
  const { query, params, resolvedUrl } = context;

  // console.log("oofffffffff", query);
  // console.log("oofffffffff", params);
  // console.log("oofffffffff", resolvedUrl);

  let fullCourseData: any = await getFullCourseDetails(params);
  let allCurrentCommentData: any = await getAllBlogComments(params);
  let allEnrolledStudentData: any = await getAllEnrolledStudents(params);

  return { fullCourseData, allCurrentCommentData ,allEnrolledStudentData};
};

/**
 *
 * @returns stringyfied json [] | []
 *
 * returns a single blog post based on params id
 *
 * returns an array instance []
 */
const getFullCourseDetails: (params: any) => Promise<any> = async (params: any) => {
  let _id = params?.id;
  let courseData: any[] | string | any;

  try {
    courseData = await Course.find(
      { _id },
      {
        authorId: 0,
        bodyDelta: 0,
        __v: 0,
      }
    );
    courseData = JSON.stringify(courseData);
  } catch (error: any) {
    courseData = JSON.stringify([]);
  }

  return courseData;
};

/**
 *
 * @param params
 * @returns []
 *
 * sends a stringyfied [] , makes sure to json parse on the client side
 *
 * always returns a [] or string of array
 * gets the current blog post id from the params id (url id)
 */
const getAllBlogComments = async (params: any) => {
  let courseId = params?.id;
  let allBlogComments: any[] | string | any;

  try {
    allBlogComments = await Comment.find({ courseId }).sort({
      createdAt: -1,
    });
    allBlogComments = JSON.stringify(allBlogComments);
  } catch (error: any) {
    allBlogComments = JSON.stringify([]);
  }

  return allBlogComments;
};



/**
 *
 * @param params
 * @returns []
 *
 * sends a stringyfied [] , makes sure to json parse on the client side
 *
 * always returns a [] or string of array
 * gets the current blog post id from the params id (url id)
 */
const getAllEnrolledStudents= async (params: any) => {
  let courseId = params?.id;
  let allEnrolledStudents: any[] | string | any;

  try {
    allEnrolledStudents = await Student.find({ courseId }).sort({
      createdAt: -1,
    });
    allEnrolledStudents = JSON.stringify(allEnrolledStudents);
  } catch (error: any) {
    allEnrolledStudents = JSON.stringify([]);
  }

  return allEnrolledStudents;
};



export const serverAllCourses: (context: any) => Promise<any> = async (
  context
) => {
  connectDb();
  const { query, params, resolvedUrl } = context;

  // console.log("oofffffffff", query);
  // console.log("oofffffffff", params);
  // console.log("oofffffffff", resolvedUrl);

  let allCourseData: any = await getAllCourses(params);


  return { allCourseData};
};




const getAllCourses = async (params: any) => {

  let allPosts: undefined | PostData | PostData[] | any[] | string;


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

  } catch (error: any) {
    return [];
  }
  allPosts = await JSON.stringify(allPosts);
  return allPosts;
};

