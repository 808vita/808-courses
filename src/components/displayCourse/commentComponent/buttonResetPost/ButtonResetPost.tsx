
import { fetchCreateCourseComment } from "@/fetchApiCallsCourse/fetchApiCallsCourse";
import { IUserSession } from "@/pages/api/course/handle";

import { RootState } from "@/redux/store";
import { useReduxMethods } from "@/redux/useReduxMethods/useReduxMethods";
import rotuerReplace from "@/util/routerReplace";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ButtonResetPost = ({
  commentContent,
  setCommentContent,
  setHide,
}: any) => {
  const { data: sessionData } = useSession();
  const session: IUserSession = sessionData as IUserSession;
  let commenterId: string = session?.user?._id;
  let email: string = session?.user?.email;

  const { query, asPath } = useRouter();
  // console.log(query, "router data");
  const courseId = query?.id as string;
  // const [errorCommentForm, setErrorCommentForm] = useState<string | null>(null);

  const { setState } = useReduxMethods();

  const setErrorCommentForm = (prop: any) =>
    setState({
      stateName: "errorCommentForm",
      stateData: prop,
    });

  const { errorCommentForm,hideComment } = useSelector(
    (state: RootState) => state?.pageUseState
  );


  /**
   * reset the text area
   *
   */
  const resetHandler = () => {
    // console.log("reset", commentContent);
    setCommentContent("");
  };

  /**
   *
   * @returns void
   *
   * post a new comment to the current post
   *
   * fetch call returns {success:boolean}
   * based on which the current page is reloaded to get the lastest comments
   *
   */
  const postCommentHandler = async () => {
    if (commentContent !== "") {
      // console.log("post this", commentContent);

      const success = await fetchCreateCourseComment(
        commenterId,
        commentContent,
        courseId,
        email
      );
      setCommentContent("");
      setHide(!hideComment);

      if (success?.sucess) {
        // rotuerReload();
        rotuerReplace(asPath);
      }

      return;
    }

    // console.log("empty", commentContent);
    setErrorCommentForm("Cannot be empty!");
    setTimeout(() => setErrorCommentForm(null), 3000);
  };

  return (
    <>
      <div>
        <button
          className="btn btn-outline-secondary mx-2"
          onClick={resetHandler}
        >
          Reset
        </button>
        <button
          className="btn btn-outline-success mx-2"
          onClick={postCommentHandler}
        >
          Post
        </button>
      </div>

      <div className="text-center">
        {errorCommentForm && (
          <span className="errorCommentForm-text p-2">{errorCommentForm}</span>
        )}
      </div>
    </>
  );
};

export default ButtonResetPost;
