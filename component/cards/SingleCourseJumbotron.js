import SingleCourse from "../../pages/course/[slug]";
import { currencyFormatter } from "../../utils/helpers";
import { Badge, Modal } from "antd";
import ReactPlayer from "react-player";
import { Button } from "antd";
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";
const SingleCourseJumbotron = ({
  course,
  showModal,
  setPreview,
  preview,
  setShowModal,
  loading,
  user,
  handlePaidEnrollment,
  handleFreeEnrollment,
  setEnrolled,
  enrolled,
}) => {
  const {
    name,
    description,
    instructor,
    price,
    image,
    paid,
    category,
    updatedAt,
    lessons,
  } = course;

  return (
    <div className="jumbotron bg-primary square">
      <div className="row">
        <div className="col-md-8">
          <h1 className="text-light font-weight-bold">{name}</h1>
          <p className="lead">
            {description && description.substring(0, 160)}....
          </p>
          {/* <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-4 mr-2"
          /> */}
          <Button
            type="primary"
            block
            shape="square"
            // count={category}
            style={{
              backgroundColor: "#202040",
              width: "30%",
              minWidth: "90px",
              border: "2px solid black",
              borderRadius: "10px",
              fontSize: "1.2rem",

              height: "45px",
            }}
            className="mb-2 mt-2"
          >
            {category}
          </Button>
          <p>Created by {instructor.name}</p>
          <p
            style={{
              fontSize: "1rem",
            }}
          >
            {" "}
            Last updated {new Date(updatedAt).toLocaleDateString()}
          </p>
          <Button
            className="getting-started btn btn-block "
            style={{
              fontSize: "1.2rem",
              backgroundColor: "#202040",
              color: "white",
              border: "#202030",
              height: "5vh",
            }}
          >
            {paid
              ? currencyFormatter({ amount: price, currency: "inr" })
              : "Free"}
          </Button>
        </div>
        <div className="col-md-4">
          {lessons[0].video && lessons[0].video.Location ? (
            <div
              onClick={() => {
                setPreview(lessons[0].video.Location);
                setShowModal(!showModal);
              }}
            >
              <ReactPlayer
                className="react-player-div"
                light={image.Location}
                url={lessons[0].video.Location}
                width="100%"
                height="225px"
              />
            </div>
          ) : (
            <>
              {" "}
              <img src={image.Location} alt={name} className="img img-fluid" />
            </>
          )}
          {loading ? (
            <div className="d-flex justify-content-center">
              <LoadingOutlined className="h1 text-danger" />
            </div>
          ) : (
            <Button
              className="mb-3 mt-3"
              type="danger"
              block
              shape="square"
              // icon={<SafetyOutlined className="pb-3" />}
              disabled={loading}
              style={{
                height: "5vh",
                display: "flex",
                backgroundColor: "#03045e",
                borderColor: "#03045e",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
            >
              <SafetyOutlined className="" />

              {user
                ? enrolled.status
                  ? "Go to course"
                  : "Enroll"
                : "Login to enroll"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default SingleCourseJumbotron;
