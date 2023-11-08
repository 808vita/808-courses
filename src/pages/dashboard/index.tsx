import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import LoginComponent from "@/components/login/Login";
import DashboardComponent from "@/components/courseComponents/DashboardComponent";
import { fetchGetEnrolledCoursesList } from "@/fetchApiCallsCourse/fetchApiCallsCourse";
import { serverAllCourses } from "@/getServerSideCallsCourse/getServerSideCalls-CoursePage-Comments";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useReduxMethods } from "@/redux/useReduxMethods/useReduxMethods";
import { IUserSession } from "../api/course/handle";

export interface Props {
  [key: string]: any;
}

const UserPanel = ({ allCourseData }: any) => {
  const { data: sessionData, status } = useSession();
  const session: IUserSession = sessionData as IUserSession;
  // console.log(session, status);

  const parsedAllCourseData = JSON.parse(allCourseData);
  console.log(parsedAllCourseData, "parsedAllCourseData");

  // const [parsedCourses, setParsedCourses] = useState<any[] | any>([]);

  const { setState } = useReduxMethods();

  const setParsedCourses = (prop: any) =>
    setState({
      stateName: "parsedCourses",
      stateData: prop,
    });

  const { parsedCourses } = useSelector(
    (state: RootState) => state?.pageUseState
  );

  useEffect(() => {
    (async () => await fetchGetEnrolledCoursesList(setParsedCourses))();
    // (async () => await fetchGetAuthorAdminBlogList(setParsedCourses))();
  }, [session?.user?.role]);

  useEffect(() => {
    console.log(parsedCourses);
  }, [parsedCourses]);

  // const parsedCourses = JSON.parse(allCoursesInParts);
  console.log(parsedCourses, "parsedCourses");

  if (status === "loading") {
    return "Loading...";
  }

  if (["admin", "instructor", "student"].includes(session?.user?.role)) {
    return (
      <>
        <div className="blog-list px-md-5 py-5 p-md-5">
          <div className="container single-col-max-width">
            {parsedCourses?.map((courseItem: Props) => (
              <DashboardComponent
                key={courseItem._id}
                enrollementData={courseItem}
                parsedAllCourseData={parsedAllCourseData}
              />
            ))}
            {parsedCourses?.length === 0 && <h3>Please Enroll To Courses.</h3>}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h3>Please Login To Continue</h3>
        <LoginComponent />
      </>
    );
  }
};

export default UserPanel;

// This gets called on every request
export async function getServerSideProps(context: any) {


  const { allCourseData } = await serverAllCourses(context);

  // Pass data to the page via props
  return { props: { allCourseData } };
}
