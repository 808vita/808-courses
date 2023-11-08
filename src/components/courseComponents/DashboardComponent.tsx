import React, { FunctionComponent } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import ButtonMarkComplete from "./buttonMarkComplete/ButtonMarkComplete";
import BadgeWrapComponent from "../displayCourse/badgeWrapComponent/BadgeWrapComponent";
import ProgressComponent from "../progressComponent/ProgressComponent";

interface Props {
  [key: string]: any;
}

const DashboardComponent: FunctionComponent<Props> = ({
  enrollementData,
  parsedAllCourseData,
}) => {
  console.log(parsedAllCourseData, "parsedAllCourseData course");

  const currentCourse = parsedAllCourseData?.filter(
    (item: any) => item._id === enrollementData.courseId
  )?.[0];

  console.log(currentCourse, "current course");

  return (
    <div className="blog-list-bg p-5 item mb-5 break-word">
      <div className="row g-2 g-xl-0">
        <div className="col-md-8 blog-details ">
          <h3 className="title mb-1">{currentCourse?.title}</h3>
          <div className="meta mb-1">
            <span className="date">
              Updated:
              {" " +
                formatDistanceToNow(new Date(currentCourse?.updatedAt), {
                  addSuffix: true,
                })}
            </span>
          </div>
          <div className="intro ">
            <p>{currentCourse.description}</p>
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-center mb-5">
          {enrollementData?.progress === "in progress" ? (
            <ButtonMarkComplete postId={enrollementData?._id} />
          ) : (
            <h4 key={"completed"}>Course Completed</h4>
          )}
        </div>

        <ProgressComponent enrollementData={enrollementData} />
        <div className="blog-post-bg p-5 mb-5">
          <h3>
            <strong className="fw-light">Instructor:</strong>
            <BadgeWrapComponent>{currentCourse?.instructor}</BadgeWrapComponent>
          </h3>
          <h3>
            <strong className="fw-light">Duration:</strong>
            <BadgeWrapComponent>{currentCourse?.duration}</BadgeWrapComponent>
          </h3>
          <h3>
            <strong className="fw-light">Enrollment:</strong>
            <BadgeWrapComponent>
              {currentCourse?.enrollementStatus}
            </BadgeWrapComponent>
          </h3>
          <h3>
            <strong className="fw-light">Location: </strong>
            <BadgeWrapComponent>{currentCourse?.loc} </BadgeWrapComponent>
          </h3>
          <h3>
            <strong className="fw-light">Schedule: </strong>
            <BadgeWrapComponent>{currentCourse?.schedule} </BadgeWrapComponent>
          </h3>

          <h3>
            <strong className="fw-light">Pre-Requisties: </strong>

            {currentCourse?.requisites.map((item: string) => (
              <BadgeWrapComponent key={item}>{item}</BadgeWrapComponent>
            ))}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
