import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Context from "../context/index";
import Username from "./user_name";
//import { Context } from "../../context";
import Head from "next/head";
import CourseTooltip from "./CourseTooltip";
import CourseCard from "../component/cards/CourseCard";
const Index = ({ courses }) => {
  //const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await axios.get("/api/courses");
  //     setCourses(data);
  //   };
  //   fetchCourses();
  // }, []);
  return (
    <>
      <Head>
        <title>Learnative</title>
        {/* Add meta data for better SEO */}
      </Head>
      <div
        style={{
          background: "black",
        }}
      >
        <h1 className="jumbotron text-center mb-4">
          <div>Learnative</div>
          <p className="mb-0" style={{ fontSize: "1.8rem" }}>
            By India, For{" "}
            <img
              src="/ind.png"
              style={{
                height: "50px",
                width: "50px",
              }}
            />
          </p>
        </h1>
      </div>
      <div style={{ width: "100vw" }}>
        <img
          src="/landing_slide1.svg"
          style={{
            width: "100vw",
          }}
        />
      </div>
      <CourseTooltip />

      <div className="container-fluid pt-3">
        <Username />

        <div className="row">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4 p-3">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
    },
  };
}
export default Index;
