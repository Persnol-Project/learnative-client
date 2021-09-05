import Link from "next/link";
import { useEffect, useState } from "react";

const InstructorNav = () => {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    //console.log(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link href="/instructor" className="pb-2">
        <a
          className={`nav-link btn-style1 ${
            current === "/instructor" && "active"
          }`}
          style={{ marginBottom: "10px" }}
        >
          {" "}
          Dashboard
        </a>
      </Link>
      <Link href="/instructor/course/create" className="pt-2">
        <a
          style={{ marginBottom: "10px" }}
          className={`nav-link pt-2 btn-style1 ${
            current === "/instructor/course/create" && "active"
          }`}
        >
          {" "}
          Create Course
        </a>
      </Link>
      <Link href="/instructor/revenue">
        <a
          style={{ marginBottom: "10px" }}
          className={`nav-link pt-2 btn-style1 ${
            current === "/instructor/revenue" && "active"
          }`}
        >
          {" "}
          Revenue
        </a>
      </Link>
    </div>
  );
};

export default InstructorNav;
