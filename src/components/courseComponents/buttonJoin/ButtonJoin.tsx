import { fetchJoinCourse } from "@/fetchApiCallsCourse/fetchApiCallsCourse";
import { IUserSession } from "@/pages/api/course/handle";

import { RootState } from "@/redux/store";
import { useReduxMethods } from "@/redux/useReduxMethods/useReduxMethods";
import { routerPush } from "@/util/routerPush";


import rotuerReplace from "@/util/routerReplace";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  postId: string;
}

const ButtonJoin = ({ postId }: Props) => {
  // const [confirmJoin, setConfirmJoin] = useState(false);

  const { setState } = useReduxMethods();

  const setConfirmJoin = (prop: any) =>
    setState({
      stateName: "confirmJoin",
      stateData: prop,
    });
  const setSearchError = (prop: any) =>
    setState({
      stateName: "searchError",
      stateData: prop,
    });

  const { confirmJoin } = useSelector(
    (state: RootState) => state?.pageUseState
  );

  const { query, asPath } = useRouter();

  const { data: sessionData } = useSession();
  const session: IUserSession = sessionData as IUserSession;
  let studentId: string = session?.user?._id;
  let role: string = session?.user?.role;
  console.log(role,"role")

 

  const courseId = query?.id as string;

  const joinHandler = (postId: string) => {
    // console.log("postId", postId);

    if(!role){
      routerPush("/login")
    }

    setConfirmJoin(!confirmJoin);
  };

  const cancelHandler = () => {
    setConfirmJoin(!confirmJoin);
  };

  const confirmHandler = async (postId: string) => {
    // console.log("postId", postId);
    // setConfirmJoin(false);

    const success = await fetchJoinCourse(studentId, courseId);

    if (success?.sucess) {
      // rotuerReload();
      setConfirmJoin(!confirmJoin);
      rotuerReplace(asPath);
    }
  };

  return (
    <>
      {!confirmJoin && (
        <>
          <button
            className="btn btn-success p-4 mx-5"
            onClick={() => joinHandler(postId)}
          >
            {`Join Course!`}
          </button>
        </>
      )}
      {confirmJoin && (
        <div className="d-flex justify-content-center align-items-center text-wrap">
          <button
            className="btn btn-outline-secondary p-4 mx-2"
            onClick={() => cancelHandler()}
          >
            {`Back`}
          </button>
          <button
            className="btn btn-success p-4 mx-2"
            onClick={() => confirmHandler(postId)}
          >
            {`Confirm`}
          </button>
        </div>
      )}
    </>
  );
};

export default ButtonJoin;
