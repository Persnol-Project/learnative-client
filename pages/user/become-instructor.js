import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button, Tooltip } from "antd";
import PersonIcon from "@material-ui/icons/Person";
import { BoxLoading } from "react-loadingg";

import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoutes from "../../component/routes/UserRoutes";

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    //console.log("become instructor");
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        //console.log(err.response.status);
        var s = "Stripe login failed. Try again....";
        toast.error(`⚠️ ${s}`);
        setLoading(false);
      });
  };
  return (
    <>
      <h1 className="jumbotron text-center square pb-9">Become Instructor</h1>

      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center p-4">
            <img className="" src="/being_inst_1.svg" />
          </div>
          <div className="col-md-6 text-center my-auto p-4">
            <div className="instructor-box text-center m-auto">
              Come Work with Us & Make education accessible to all
            </div>
            <Tooltip title="you will be redirected to stripe">
              <Button
                className=" mt-3 mb-3 top-nav getting-started p-4"
                type="primary"
                block
                shape="square"
                //icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                onClick={becomeInstructor}
                style={{
                  backgroundColor: "#2A41E8",
                  color: "white",
                  borderRadius: "10px",

                  margin: "auto",
                  borderColor: "#2A41E8",
                }}
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
              >
                {loading ? (
                  //  <BoxLoading className="icon" />
                  <LoadingOutlined className="icon" />
                ) : (
                  <PersonIcon className="icon" />
                )}
                {loading ? "Processing...." : "Getting Started"}
              </Button>
            </Tooltip>
          </div>
          <div className="text-center p-3">
            <h1>Why to join us?</h1>

            <div className="row flex-fix">
              <div
                className="col-md-4 mx-auto card pb-2 how-can-we-help"
                style={{ borderRadius: "10px" }}
              >
                <div className="card-title pt-2" style={{ fontSize: "1.5rem" }}>
                  📝 Design the course, the way you want...
                </div>
                <img src="/course_design.svg" />
                <div style={{ fontSize: "1.2rem", textAlign: "left" }}>
                  First of all, choose a good topic to make course, then plan a
                  course structure according to you. The way you want to teach
                  is upto you only.
                </div>
              </div>

              <div
                className="col-md-4 mx-auto card pb-2 how-can-we-help"
                style={{ borderRadius: "10px" }}
              >
                <div className="card-title pt-2" style={{ fontSize: "1.5rem" }}>
                  📹 Record the course video...
                </div>
                <img src="/course_recording.svg" />
                <div style={{ fontSize: "1.2rem", textAlign: "left" }}>
                  You can start Recording your video using DSLR or your
                  smartphone. If you don’t like being on camera, just record
                  your screen.
                </div>
              </div>
              <div
                className="col-md-4 mx-auto card pb-2 how-can-we-help"
                style={{ borderRadius: "10px" }}
              >
                <div className="card-title pt-2" style={{ fontSize: "1.5rem" }}>
                  🚀 Launch your course...
                </div>
                <img src="/course_launch.svg" />
                <div style={{ fontSize: "1.2rem", textAlign: "left" }}>
                  Get your initial audience by promoting your course through
                  social media or in your school. Any user can search your
                  course on our website, through each paid enrollment you get
                  paid directly.
                </div>
              </div>
            </div>
          </div>
          <div className="text-center p-3">
            <h1>How can we help you?</h1>
            <div className="row flex-fix">
              <span
                className="col-md-4 mx-auto card pb-2 how-can-we-help-1"
                style={{ borderRadius: "10px" }}
              >
                <div className="card-title" style={{ fontSize: "1.5rem" }}>
                  Course Structure
                </div>
                <img src="/course_review.svg" />
                <div style={{ fontSize: "1.2rem", textAlign: "left" }}>
                  Our team is available for your support throught the process
                  and to provide feedback on your initial video. You can contact
                  us whenever you want...
                </div>
              </span>

              <span
                className="col-md-4  mx-auto card pb-2 how-can-we-help-1"
                style={{ borderRadius: "10px" }}
              >
                <div className="card-title" style={{ fontSize: "1.5rem" }}>
                  Getting traffic for your course
                </div>
                <img src="/course_support.svg" />
                <div style={{ fontSize: "1.2rem", textAlign: "left" }}>
                  We are connected with a network of schools. To get initial
                  traffic, you should make some free courses and develop that
                  audience which will be happy to learn from you even in paid
                  course.
                </div>
              </span>
            </div>
          </div>
          <div className="col-md-12 text-center mx-auto p-7">
            <div className="p-4 mx-auto">
              <img
                src="/become_instructor.svg"
                className="text-center pb-3"
                style={{
                  width: "80vw",
                  maxWidth: "400px",
                }}
              />
              <br />
              <h2>
                {" "}
                So what are you waiting for?
                <br />
                Join our platform...{" "}
              </h2>
              <p className="lead">
                {" "}
                We have partnered with Stripe to transfer earnings to your bank
                account{" "}
              </p>

              <Button
                className="mb-3 top-nav getting-started"
                type="primary"
                block
                shape="square"
                //icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                onClick={becomeInstructor}
                style={{
                  backgroundColor: "#2A41E8",
                  color: "white",
                  borderRadius: "10px",
                  margin: "auto",
                  borderColor: "#2A41E8",
                }}
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
              >
                {loading ? (
                  <LoadingOutlined className="icon" />
                ) : (
                  <SettingOutlined className="icon" />
                )}
                {loading ? "Processing...." : "Payoutsetup"}
              </Button>
              <p className="load">
                You will be redirected to stripe gateway to complete onboarding
                process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BecomeInstructor;
