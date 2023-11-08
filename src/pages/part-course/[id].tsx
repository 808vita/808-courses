import { useState, useEffect } from "react";
import type { GetServerSideProps } from "next";

import PaginationComponentCourse from "@/components/paginationCourse/PaginationComponentCourse";
import { serverSideCourse } from "@/getServerSideCallsCourse/getServerSideCalls-Index-Pagination";
import CourseComponent from "@/components/courseComponents/CourseComponent";

export interface ICourseParts {
  allCourseCount: string;
  allCoursesInParts: string;
}

export interface courseItem {
  [key: string]: any;
}

export default function Home({
  allCourseCount,
  allCoursesInParts,
}: ICourseParts) {
  const [loading, setLoading] = useState<boolean>(true);
  console.log(allCourseCount, "getServerSideProps");
  const parsedCourses = JSON.parse(allCoursesInParts);
  console.log(parsedCourses, "parsedCourses");

  return (
    <>
      <div className="blog-list px-md-5 py-5 p-md-5">
        <div className="container single-col-max-width">
          {parsedCourses?.map((courseItem: courseItem) => (
            <CourseComponent key={courseItem._id} courseItem={courseItem} />
          ))}
          {parsedCourses?.length === 0 && <h3>No posts yet /Loading</h3>}
        </div>
      </div>

      <PaginationComponentCourse allCourseCount={allCourseCount} />
    </>
  );
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // Fetch data from external API
  // const res = await fetch(domain + "/api/blog-post/get-all");
  // const data = await res.json();
  console.log("oofffffffff");

  const { allCourseCount, allCoursesInParts } = await serverSideCourse(context);

  // Pass data to the page via props
  return { props: { allCourseCount, allCoursesInParts } };
};
