import { routerPush } from "@/util/routerPush";
import React from "react";


interface Props {
  courseId: string;
}

const ButtonViewMore = ({ courseId }: Props) => {
  const redirectPost = (courseId: string) => {
    routerPush(`/course/${courseId}`);
  };

  return (
    <button
      className="btn btn-outline-primary"
      // style={{ height: "auto", width: "300px" }}
      onClick={() => redirectPost(courseId)}
    >
      {`View Course...`}
    </button>
  );
};

export default ButtonViewMore;
