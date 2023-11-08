import React, { useState } from "react";
import ButtonResetPost from "./buttonResetPost/ButtonResetPost";
import CommentTextArea from "./commentTextArea/CommentTextArea";
import { RootState } from "@/redux/store";
import { useReduxMethods } from "@/redux/useReduxMethods/useReduxMethods";
import { useSelector } from "react-redux";

const CommentForm = () => {
  // const [commentContent, setCommentContent] = useState("");
  // const [hideComment, setHideComment] = useState(true);




  const { setState } = useReduxMethods();

  const setCommentContent = (prop: any) =>
    setState({
      stateName: "commentContent",
      stateData: prop,
    });
  const setHideComment = (prop: any) =>
    setState({
      stateName: "hideComment",
      stateData: prop,
    });

  const { commentContent, hideComment } = useSelector(
    (state: RootState) => state?.pageUseState
  );






  return (
    <>
      <button
        className="btn btn-outline-primary mb-5"
        onClick={() => setHideComment(!hideComment)}
      >
        {hideComment ? "Post a comment" : "hideComment"}
      </button>
      {!hideComment && (
        <div className="login-form-bg pt-5 pb-5 px-md-5 pe-md-5 mb-5">
          <div className="login-form">
            <div className="row mb-2">
              <CommentTextArea
                commentContent={commentContent}
                setCommentContent={setCommentContent}
              />
            </div>
            <div className="text-end">
              <ButtonResetPost
                commentContent={commentContent}
                setCommentContent={setCommentContent}
                setHide={setHideComment}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentForm;
