import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  allCourseCount: string | number;
}

const PaginationComponentCourse = ({ allCourseCount }: Props) => {
  const itemsPerPage = 3;
  let paginationCount = 0;
  if (typeof allCourseCount === "number") {
    paginationCount = Math.ceil(allCourseCount / itemsPerPage);
  }

  const paginationArray = Array.from(Array(paginationCount).keys());

  const { asPath, query } = useRouter();

  return (
    <>
      <nav aria-label="...">
        <ul className="pagination pagination-md justify-content-center">
          {paginationArray.map((curr) => (
            <li
              key={curr}
              className={`page-item ${
                asPath === "/" && curr === 0
                  ? "active"
                  : query.id == String(curr)
                  ? "active"
                  : ""
              }`}
            >
              <Link
                className="page-link"
                href={` ${curr == 0 ? "/" : "/part-course/" + curr}`}
              >
                {curr + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default PaginationComponentCourse;
