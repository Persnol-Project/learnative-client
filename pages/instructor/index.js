import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../component/routes/InstructorRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Instructor Dashboard</h1>
      <div style={{ minHeight: "30vh" }}>
        <div className="wide1 mt-3 mb-4 mx-auto">
          {courses &&
            courses.map((course) => (
              <>
                <div className="media course-card1 pt-2">
                  <div className="row mx-auto">
                    <div className="col-md-1 text-center">
                      <Avatar
                        size={80}
                        src={
                          course.image ? course.image.Location : "/course.png"
                        }
                        className="avatar-course"
                      />
                    </div>
                    <div
                      className=" col-md-10 media-body pl-2"
                      style={{ overflowY: "hidden" }}
                    >
                      <div className="row pb-3 mx-auto">
                        <div className="col description">
                          <Link
                            href={`/instructor/course/view/${course.slug}`}
                            className="pointer"
                          >
                            <a className="mt-2" style={{ color: "black" }}>
                              <h3 className="pt-2">{course.name}</h3>
                            </a>
                          </Link>
                          <p style={{ marginTop: "-10px", color: "#777" }}>
                            {course.lessons.length} Lessons
                          </p>

                          {course.lessons.length < 5 ? (
                            <p style={myStyle} className="text-warning">
                              At least 5 lessons are required to publish a
                              course
                            </p>
                          ) : course.published ? (
                            <p style={myStyle} className="text-success">
                              Your course is live in the marketplace
                            </p>
                          ) : (
                            <p style={myStyle} className="text-success">
                              Your course is ready to be published
                            </p>
                          )}
                        </div>

                        <div className="col-md-2 mt-3 text-center">
                          {course.published ? (
                            <Tooltip title="Published">
                              <CheckCircleOutlined className="h5 pointer text-success" />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Unpublished">
                              <CloseCircleOutlined className="h5 pointer text-warning" />
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </InstructorRoute>
  );
};

export default InstructorIndex;
