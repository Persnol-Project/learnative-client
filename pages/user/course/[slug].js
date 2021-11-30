import { useRouter } from "next/router";
import { useState, useEffect, createElement } from "react";
import axios from "axios";
import { Button, Menu, Avatar } from "antd";
import StudentRoutes from "../../../component/routes/StudentRoutes";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";

import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";

const { Item } = Menu;
const SingleCourse = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);
  const [updateState, setUpdateState] = useState(false);
  const { slug } = router.query;
  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };
  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    console.log(data);
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
  };
  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    // console.log("COMPLETED LESSONS => ", data);
    setCompletedLessons(data);
  };

  const markIncompleted = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      });
      console.log(data);
      const all = completedLessons;
      console.log("ALL => ", all);
      const index = all.indexOf(course.lessons[clicked]._id);
      if (index > -1) {
        all.splice(index, 1);
        console.log("ALL WITHOUT REMOVED => ", all);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);
  useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course]);

  return (
    <StudentRoutes>
      {/* <h1>Course Slug {JSON.stringify(course, null, 4)}</h1> */}
      <div className="row">
        <div className=" col-md-12" style={{ width: "100%" }}>
          {clicked !== -1 ? (
            <>
              <div
                className="col alert square"
                style={{ background: "#92B7FF" }}
              >
                <b>{course.lessons[clicked].title.substring(0, 30)}</b>
                {completedLessons.includes(course.lessons[clicked]._id) ? (
                  <span
                    className="float-right pointer"
                    onClick={markIncompleted}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    ❌ Mark as incomplete
                  </span>
                ) : (
                  <span
                    className="float-right pointer"
                    onClick={markCompleted}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    ✅ Mark as completed
                  </span>
                )}
              </div>
              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <>
                    <div className="wrapper">
                      <ReactPlayer
                        className="player mx-auto"
                        url={course.lessons[clicked].video.Location}
                        width="70%"
                        height="70%"
                        controls
                      />
                    </div>
                  </>
                )}

              <div
                style={{
                  background: "#f9c8b3",
                  color: "black",
                  borderRadius: "15px",
                }}
              >
                <div
                  className="text-center p-3"
                  style={{ fontSize: "2rem" }}
                >
                  Description:{" "}
                </div>
                <ReactMarkdown
                  children={course.lessons[clicked].content}
                  className="single-post p-3"
                  
                />
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center p-5">
              <div className="text-center p-5">
                <PlayCircleOutlined className="text-primary display-1 p-5" />
                <p className="lead">Click on the lessons to start learning</p>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-9 mx-auto" style={{ minWidth: "320px" }}>
          <Button
            onClick={() => setCollapsed(!collapsed)}
            className="text-primary mt-1 btn-block mb-2 getting-started"
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}{" "}
            {!collapsed && "Lessons"}
          </Button>

          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{ overflowX: "hidden" }}
          >
            {course.lessons.map((lesson, index) => (
              <Item
                className="row pt-1 pb-2"
                onClick={() => setClicked(index)}
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                // icon={<Avatar className="">{index + 1}</Avatar>}
              >
                <Avatar style={{ color: "black" }}>{index + 1}</Avatar>{" "}
                {lesson.title.substring(0, 30)}
                {completedLessons.includes(lesson._id) ? (
                  <CheckCircleFilled
                    className=" text-primary  mt-3 "
                    style={{ float: "right", marginRight: "0%" }}
                  />
                ) : (
                  <MinusCircleFilled
                    className="float-right text-danger  mt-3"
                    style={{ float: "right" }}
                  />
                )}
              </Item>
            ))}
          </Menu>
        </div>
      </div>
    </StudentRoutes>
  );
};

export default SingleCourse;
