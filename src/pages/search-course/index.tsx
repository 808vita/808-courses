
import React, { useState } from "react";
import { IBlogPost } from "..";
import SearchComponentCourse from "@/components/searchComponentCourse/searchComponentCourse";
import CourseComponent from "@/components/courseComponents/CourseComponent";
import { useReduxMethods } from "@/redux/useReduxMethods/useReduxMethods";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const SearchPage = () => {
  // const [parsedCourseList, setparsedCourseList] = useState([]);

  const { setState } = useReduxMethods();

  const setparsedCourseList = (prop: any) =>
    setState({
      stateName: "parsedCourseList",
      stateData: prop,
    });

  const { parsedCourseList } = useSelector(
    (state: RootState) => state?.pageUseState
  );

  return (
    <div>
      <SearchComponentCourse setparsedCourseList={setparsedCourseList} />
      <>
        <div className="blog-list px-md-5 py-5 p-md-5">
          <div className="container single-col-max-width">
            {parsedCourseList?.map((courseItem: IBlogPost) => (
              <CourseComponent key={courseItem._id} courseItem={courseItem} />
            ))}
            {parsedCourseList?.length === 0 && <h3>Search Courses</h3>}
          </div>
        </div>
      </>
    </div>
  );
};

export default SearchPage;
