import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ICommentData } from "../DisplayCourse";

interface Props {
  commentData: ICommentData;
  
}

const CommentComponent = ({ commentData }: Props) => {
  return (
    <div className="blog-comment-bg mb-5 p-5">
      <p>{commentData.commentContent}</p>
      <p>
        {formatDistanceToNow(new Date(commentData.createdAt), {
          addSuffix: true,
        })}
      </p>
      <p>commented by {commentData?.email}</p>
    </div>
  );
};

export default CommentComponent;
