import { fetchSearchCourseList } from "@/fetchApiCallsCourse/fetchApiCallsCourse";
import { RootState } from "@/redux/store";
import { useReduxMethods } from "@/redux/useReduxMethods/useReduxMethods";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const SearchComponentCourse = ({ setparsedCourseList }: any) => {
  // const [searchText, setSearchText] = useState("");
  // const [searchError, setSearchError] = useState<string | null>(null);

  const { setState } = useReduxMethods();

  const setSearchText = (prop: any) =>
    setState({
      stateName: "searchText",
      stateData: prop,
    });
  const setSearchError = (prop: any) =>
    setState({
      stateName: "searchError",
      stateData: prop,
    });

  const { searchText, searchError } = useSelector(
    (state: RootState) => state?.pageUseState
  );

  const searchHandler = async () => {
    if (searchText === "") {
      setSearchError("Cannot be empty");
      setTimeout(() => setSearchError(null), 3000);
      return;
    }

    await fetchSearchCourseList(searchText, setparsedCourseList);
  };

  return (
    <div className="login-form-bg pt-5 pb-5 pe-md-5 px-md-5 mt-5">
      <div className="d-flex login-form">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search posts"
          aria-label="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={searchHandler}
        >
          Search
        </button>
      </div>
      <br />
      <div className="text-center">
        {searchError && <span className="error-text p-2">{searchError}</span>}
      </div>
    </div>
  );
};

export default SearchComponentCourse;
