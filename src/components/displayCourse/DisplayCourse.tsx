import React from "react";
import CommentForm from "./commentComponent/CommentForm";
import CommentComponent from "./commentComponent/CommentComponent";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useSession } from "next-auth/react";

import LoginComponent from "../login/Login";
import AccordianSyllabusComponent from "./accordionSyllabusComponent/AccordionSyllabusComponent";
import BadgeWrapComponent from "./badgeWrapComponent/BadgeWrapComponent";
import ButtonJoin from "../courseComponents/buttonJoin/ButtonJoin";
import ButtonMarkComplete from "../courseComponents/buttonMarkComplete/ButtonMarkComplete";
import ProgressComponent from "../progressComponent/ProgressComponent";
import { IUserSession } from "@/pages/api/course/handle";

export interface ICommentData {
  _id: string;
  commentContent: string;
  createdAt: string;
  email?: string;
}

const DisplayCourse = ({
  parsedfullCourseData,
  parsedAllCurrentCommentData,
  parsedEnrolledStudentData,
}: any) => {
  const { data: sessionData, status } = useSession();
  const session: IUserSession = sessionData as IUserSession;
  // console.log(session, status);

  // console.log(parsedfullCourseData);
  let studentId: string = session?.user?._id;

  console.log(studentId,"student")

  if (typeof parsedfullCourseData === "undefined") {
    return <h2>Please check blog post id .</h2>;
  }

  if (status === "loading") {
    return <h5>Loading....</h5>;
  }

  const currentEnrollement = parsedEnrolledStudentData?.filter(
    (item: any) => item.studentId === studentId
  );


  return (
    <article className="blog-post px-md-5 py-5 p-md-5 ">
      {/* <div className="blog-post-bg p-5 mb-5">{parsedfullCourseData?.img}</div> */}
      <div className="container single-col-max-width mb-5 blog-header-bg p-5">
        <header className="blog-post-header ">
          <h1 className="mb-2">{parsedfullCourseData?.title}</h1>
          <p className="meta mb-3">{parsedfullCourseData?.description}</p>

          <p className="date">
            Updated{" "}
            {formatDistanceToNow(new Date(parsedfullCourseData?.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </header>
      </div>
      <div className="blog-post-bg p-5 mb-5 d-flex flex-column justify-content-center align-items">
        <h2 className="pb-2">
          <strong className="fw-light">Enrollment: </strong>
          <BadgeWrapComponent>
            {parsedfullCourseData?.enrollementStatus}
          </BadgeWrapComponent>
        </h2>
        {!studentId && " Log in to join course"}
        {parsedfullCourseData?.enrollementStatus !== "closed" &&
        currentEnrollement?.length === 0 ? (
          <ButtonJoin key ={"join-course"} postId={parsedfullCourseData?._id} />
        ) : (
          currentEnrollement?.map((studentData: any) =>
            studentData?.studentId === studentId ? (
              studentData?.progress === "in progress" ? (
                <div key={"ProgressComponent"}>
                  <div className="mb-5">
                    <h4>In Progress</h4>
                    <ProgressComponent enrollementData={studentData} />
                  </div>

                  <div
                    key={"mark-complete"}
                    className="d-flex justify-content-center align-items mb-5"
                  >
                    <ButtonMarkComplete postId={studentData?._id} />
                  </div>
                </div>
              ) : (
                <div key={"completed"}>
                  <h4 key={"completed"}>Course Completed</h4>
                  <ProgressComponent enrollementData={studentData} />
                </div>
              )
            ) : (

              <ButtonJoin
                key={parsedfullCourseData?._id}
                postId={parsedfullCourseData?._id}
              />
            )
          )
        )}
      </div>
      <div className="blog-post-bg p-5 mb-5">
        <h3>
          <strong className="fw-light">Instructor:</strong>
          <BadgeWrapComponent>
            {parsedfullCourseData?.instructor}
          </BadgeWrapComponent>
        </h3>
        <h3>
          <strong className="fw-light">Duration:</strong>
          <BadgeWrapComponent>
            {parsedfullCourseData?.duration}
          </BadgeWrapComponent>
        </h3>
        <h3>
          <strong className="fw-light">Enrollment:</strong>
          <BadgeWrapComponent>
            {parsedfullCourseData?.enrollementStatus}
          </BadgeWrapComponent>
        </h3>
        <h3>
          <strong className="fw-light">Location: </strong>
          <BadgeWrapComponent>{parsedfullCourseData?.loc} </BadgeWrapComponent>
        </h3>
        <h3>
          <strong className="fw-light">Schedule: </strong>
          <BadgeWrapComponent>
            {parsedfullCourseData?.schedule}{" "}
          </BadgeWrapComponent>
        </h3>
        {/* <div
          className="blog-post-body"
          dangerouslySetInnerHTML={{ __html: parsedfullCourseData?.bodyHTML }}
        /> */}
        {/* </div> */}

        <h3>
          <strong className="fw-light">Pre-Requisties: </strong>

          {parsedfullCourseData?.requisites.map((item: string) => (
            <BadgeWrapComponent key={item}>{item}</BadgeWrapComponent>
          ))}
        </h3>
      </div>

      <div className="blog-post-bg pt-sm-5 pb-sm-5 p-md-5 mb-5">
        {parsedfullCourseData?.syllabus.map((syllabusItem: any) => (
          <AccordianSyllabusComponent
            key={syllabusItem?.week}
            syllabusItem={syllabusItem}
          />
        ))}
      </div>
      {["admin", "instructor", "student"].includes(session?.user?.role) ? (
        <CommentForm />
      ) : (
        <LoginComponent />
      )}
      {parsedAllCurrentCommentData?.map((commentData: ICommentData) => (
        <CommentComponent key={commentData?._id} commentData={commentData} />
      ))}
    </article>
  );
};

export default DisplayCourse;
