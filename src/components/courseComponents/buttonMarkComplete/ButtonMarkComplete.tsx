import { fetchPutMarkComplete } from "@/fetchApiCallsCourse/fetchApiCallsCourse";
import { RootState } from "@/redux/store";
import { useReduxMethods } from "@/redux/useReduxMethods/useReduxMethods";

import routerReload from "@/util/routerReload";

import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  postId: string;
}

const ButtonMarkComplete = ({ postId }: Props) => {
  // const [confirmMarkComplete, setConfirmMarkComplete] = useState(false);

  const { setState } = useReduxMethods();

  const setConfirmMarkComplete = (prop: any) =>
    setState({
      stateName: "confirmMarkComplete",
      stateData: prop,
    });

  const { confirmMarkComplete } = useSelector(
    (state: RootState) => state?.pageUseState
  );

  const { query, asPath } = useRouter();

  const intialHandler = (postId: string) => {
    // console.log("postId", postId);
    setConfirmMarkComplete(!confirmMarkComplete);
  };

  const cancelHandler = () => {
    setConfirmMarkComplete(!confirmMarkComplete);
  };

  const confrimCompletehandler = async (postId: string) => {
    // console.log("postId", postId);
    // setConfirmMarkComplete(false);
    const success = await fetchPutMarkComplete(postId);

    if (success?.sucess) {
      // rotuerReload();
      setConfirmMarkComplete(!confirmMarkComplete);
      routerReload();
    }
  };

  return (
    <>
      {!confirmMarkComplete && (
        <>
          <button
            className="btn btn-success mx-2 p-4"
            onClick={() => intialHandler(postId)}
          >
            {`Mark Complete`}
          </button>
        </>
      )}
      {confirmMarkComplete && (
        <>
          <button
            className="btn btn-outline-secondary p-4 mx-2"
            onClick={() => cancelHandler()}
          >
            {`Back`}
          </button>
          <button
            className="btn btn-outline-danger p-4 mx-2"
            onClick={() => confrimCompletehandler(postId)}
          >
            {`Confirm`}
          </button>
        </>
      )}
    </>
  );
};

export default ButtonMarkComplete;
