import { routerPush } from "@/util/routerPush";
import routerReload from "@/util/routerReload";

//fetch api call functions here
export const domain = "http://localhost:3000";
/**
 *
 * @param title
 * @param bodyDelta
 * @param bodyHTML
 * @param authorId
 *
 * client side - fetch api
 *
 * create course
 *
 * requires admin / author account
 *
 *
 */
export const fetchCreateCourse = async (
  title: string,
  description: string,
  bodyDelta: any,
  bodyHTML: string,
  instructorId: string,
  duration: string, enrollementStatus: string, requisites: string, syllabus: any,loc:string

) => {
  const newDelta = JSON.stringify(bodyDelta);
  try {
    const response = await fetch("/api/course/handle", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        bodyDelta: newDelta,
        bodyHTML,
        instructorId, duration, enrollementStatus, requisites, syllabus,loc
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("error", json.error);
    }

    if (response.ok) {
      console.log("success", json);
      routerPush("/");
    }
  } catch (error) {
    console.log("error", error);
  }
};


export const fetchCreateCourseComment = async (
  commenterId: string,
  commentContent: string,
  courseId: string,
  email:string
) => {
  try {
    const response = await fetch("/api/course-comment/handle", {
      method: "POST",
      body: JSON.stringify({
        commenterId,
        commentContent,
        courseId,
        email
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("error", json.error);
      return { sucess: false };
    }

    if (response.ok) {
      console.log("success", json);
      return { sucess: true };
    }
  } catch (error) {
    console.log("error", error);
    return { sucess: false };
  }
};

export const fetchGetEnrolledCoursesList = async (setParsedBlogPosts: any) => {
  try {
    const response = await fetch("/api/course/handle", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("error", json.error);
    }

    if (response.ok) {
      console.log("success", json);
      setParsedBlogPosts(json);
    }
  } catch (error) {
    console.log("error", error);
    return { error };
  }
};



export const fetchJoinCourse = async (
  studentId:string,
  courseId: string,

) => {
  try {
    const response = await fetch("/api/course-join/handle", {
      method: "POST",
      body: JSON.stringify({
        studentId,
        courseId,

      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("error", json.error);
      
      return { sucess: false };
      
    }

    if (response.ok) {
      console.log("success", json);
      return { sucess: true };
    }
  } catch (error) {
    console.log("error", error);
    return { sucess: false };
    
  }
};









export const fetchPutMarkComplete = async (
  enrollmentId: string,

) => {

  try {
    const response = await fetch("/api/course/handle", {
      method: "PUT",
      body: JSON.stringify({
        enrollmentId
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("error", json.error);
      return { sucess: false };
    }

    if (response.ok) {
      console.log("success", json);
      return { sucess:true };

    }
  } catch (error) {
    console.log("error", error);
    return { sucess: false };
  }
};


export const fetchSearchCourseList = async (
  searchText: string,
  setParsedBlogPosts: any
) => {
  try {
    const response = await fetch("/api/course-search/get", {
      method: "POST",
      body: JSON.stringify({
        searchText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("error", json.error);
      setParsedBlogPosts([]);
    }

    if (response.ok) {
      console.log("success", json);
      setParsedBlogPosts(json);
    }
  } catch (error) {
    console.log("error", error);
    setParsedBlogPosts([]);
  }
};

