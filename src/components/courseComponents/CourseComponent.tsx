import React, { FunctionComponent } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { routerPush } from "@/util/routerPush";
import ButtonViewMore from "./buttonViewCourse/ButtonViewCourse";

interface prop {
  [key: string]: any;
}

interface Props {
  courseItem: prop;
}

const CourseComponent: FunctionComponent<Props> = ({ courseItem }) => {
  const redirectPost = (postId: string) => {
    routerPush(`/course/${postId}`);
  };

  return (
    <div
      onClick={() => redirectPost(courseItem?._id)}
      className="blog-list-bg p-5 item mb-5 break-word"
    >
      <div className="row g-2 g-xl-0">
        <div className="col-md-10 blog-details ">
          <h3 className="title mb-1">{courseItem?.title?.substring(0, 50)}</h3>
          <div className="meta mb-1">
            <span className="date">
              Updated:
              {" " +
                formatDistanceToNow(new Date(courseItem?.updatedAt), {
                  addSuffix: true,
                })}
            </span>
          </div>
          <div className="intro ">
            <p>{courseItem.description?.substring(0, 200)}</p>
          </div>
        </div>
        <div className="col-md-2 d-flex align-items-center justify-content-center">
          <ButtonViewMore courseId={courseItem._id} />
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;
