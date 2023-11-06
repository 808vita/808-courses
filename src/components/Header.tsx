

import Link from "next/link";

import React from "react";



const Header = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"

      >
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            Courses 808
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor03"
            aria-controls="navbarColor03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

        </div>
      </nav>
    </>
  );
};

export default Header;
