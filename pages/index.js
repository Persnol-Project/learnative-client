import { useState, useEffect } from "react";
import axios from "axios";
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
      <h1 className="jumbotron text-center bg-primary">
        Learnative
        <p style={{ fontSize: "2rem", marginBottm: "10px" }}>
          Learn something new everyday{" "}
        </p>
      </h1>
      <div className="container-fluid pt-3">
        <div className="row">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
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
