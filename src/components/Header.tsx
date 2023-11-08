import { IUserSession } from "@/pages/api/course/handle";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const notLoggedInOptions = [
  {
    name: "Login",
    url: "/login",
  },
  {
    name: "Signup",
    url: "/signup",
  },
];

const studentloggedInOptions: any[] = [];

const authorAdminloggedInOptions = [
  {
    name: "Dashboard",
    url: "/dashboard",
  },
];

const Header = () => {
  const { data: sessionData, status } = useSession();
  const session: IUserSession = sessionData as IUserSession;
  const { asPath } = useRouter();
  // console.log(asPath);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
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
          <div className="navbar-collapse collapse" id="navbarColor03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${asPath === "/" && "active"}`}
                  aria-current="page"
                  href="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${asPath === "/search" && "active"}`}
                  aria-current="page"
                  href="/search-course"
                >
                  Search Course
                </Link>
              </li>

              {!["admin", "instructor", "student"].includes(
                session?.user?.role
              ) &&
                notLoggedInOptions.map((currNavData) => (
                  <li key={currNavData?.name} className="nav-item">
                    <Link
                      className={`nav-link ${
                        asPath === currNavData?.url && "active"
                      }`}
                      href={currNavData?.url}
                    >
                      {currNavData?.name}
                    </Link>
                  </li>
                ))}

              {["student"].includes(session?.user?.role) &&
                studentloggedInOptions.map((currNavData) => {
                  return (
                    <li key={currNavData?.name} className="nav-item">
                      <Link
                        className={`nav-link ${
                          asPath === currNavData?.url && "active"
                        }`}
                        href={currNavData?.url}
                      >
                        {currNavData?.name}
                      </Link>
                    </li>
                  );
                })}

              {["admin", "instructor", "student"].includes(
                session?.user?.role
              ) &&
                authorAdminloggedInOptions.map((currNavData) => {
                  return (
                    <li key={currNavData?.name} className="nav-item">
                      <Link
                        className={`nav-link ${
                          asPath === currNavData?.url && "active"
                        }`}
                        href={currNavData?.url}
                      >
                        {currNavData?.name}
                      </Link>
                    </li>
                  );
                })}

              {["admin", "instructor", "student"].includes(
                session?.user?.role
              ) && (
                <li className="nav-item">
                  <span
                    style={{ cursor: "pointer" }}
                    className="nav-link"
                    onClick={() => signOut()}
                  >
                    Logout
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
