import DisplayCourse from "@/components/displayCourse/DisplayCourse";

import { serverSideSingleCourse } from "@/getServerSideCallsCourse/getServerSideCalls-CoursePage-Comments";
import React from "react";

const PostPage = ({ fullCourseData, allCurrentCommentData,allEnrolledStudentData }: any) => {
  const parsedfullCourseData = JSON.parse(fullCourseData)[0];
  console.log(parsedfullCourseData, "parsedfullCourseData");

  const parsedAllCurrentCommentData = JSON.parse(allCurrentCommentData);
  console.log(parsedAllCurrentCommentData, "parsedAllCurrentCommentData");



  const parsedEnrolledStudentData = JSON.parse(allEnrolledStudentData);
  console.log(parsedEnrolledStudentData, "EnrolledStudentData");

  return (
    <div>
      <DisplayCourse
        parsedfullCourseData={parsedfullCourseData}
        parsedAllCurrentCommentData={parsedAllCurrentCommentData}
        parsedEnrolledStudentData={parsedEnrolledStudentData}
      />
    </div>
  );
};

export default PostPage;

// This gets called on every request
export async function getServerSideProps(context: any) {
  // console.log("oofffffffff");

  const { fullCourseData, allCurrentCommentData ,allEnrolledStudentData} =
    await serverSideSingleCourse(context);

  // Pass data to the page via props
  return { props: { fullCourseData, allCurrentCommentData,allEnrolledStudentData } };
}