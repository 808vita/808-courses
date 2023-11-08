import React, { useEffect } from "react";
import { useReduxMethods } from "../useReduxMethods/useReduxMethods";
import { useRouter } from "next/router";

const courseDetailsIntialState = {
  confirmJoin: false,
  confirmMarkComplete: false,
  showAccordion1: "collapse",
  showAccordion2: "collapse",
  hideComment: false,
  commentContent: "",
  errorCommentForm: null,
};

const dashboardInitialState = {
  parsedCourses: [],
  confirmMarkComplete: false,
};
const searchInitialState = {
  parsedCourseList: [],
  searchText: "",
  searchError: null,
};

const StateSetterComponent = () => {
  const { asPath } = useRouter();

  const { registerPageState } = useReduxMethods();

  useEffect(() => {
    console.log(asPath, "aspath");
    console.log(asPath.includes("/course/"), " /course/ aspath");

    if (asPath.includes("/course/")) {
      registerPageState(courseDetailsIntialState);
    } else if (asPath.includes("/dashboard")) {
      registerPageState(dashboardInitialState);
    } else if (asPath.includes("/search-course")) {
      //migrated
      registerPageState(searchInitialState);
    }
  }, [asPath, registerPageState]);

  return <></>;
};

export default StateSetterComponent;
