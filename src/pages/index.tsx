
import { useState,  } from "react";


import { serverSideCourse } from "@/getServerSideCallsCourse/getServerSideCalls-Index-Pagination";
import PaginationComponentCourse from "@/components/paginationCourse/PaginationComponentCourse";
import CourseComponent from "@/components/courseComponents/CourseComponent";


export interface IBlogPost{
  title: string;
  description: string;
  [key:string]:string;
}

export interface ICourseParts {
  allCourseCount: string;
  allCoursesInParts: string;
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
          {parsedCourses?.map((courseItem: IBlogPost) => (
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
export async function getServerSideProps(context: any) {


  const { allCourseCount, allCoursesInParts } = await serverSideCourse(
    context
  );

  // Pass data to the page via props
  return { props: {allCourseCount, allCoursesInParts } };
}
