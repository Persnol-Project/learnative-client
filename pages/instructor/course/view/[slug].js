import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoutes from "../../../../component/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import {
  UserSwitchOutlined,
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  QuestionOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../component/forms/AddLessonForm";
import { toast } from "react-toastify";
import Item from "antd/lib/list/Item";
const CourseView = () => {
  const [course, setCourse] = useState();
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload video");
  const [progress, setProgress] = useState(0);
  const [students, setStudents] = useState(0);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  useEffect(() => {
    course && studentCount();
  }, [course]);

  const studentCount = async () => {
    const { data } = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    });
    setStudents(data.length);
  };
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    // console.log(slug);
    loadCourse();
  }, [slug]);
  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };
  const handleVideo = async (e) => {
    //     console.log("handle video upload");

    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);
      //progress bar

      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );

      //successful res
      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      setUploading(false);
      console.log(err);
      toast.error("Video upload failed");
    }
  };
  //add lesson
  const handleAddLesson = async (e) => {
    e.preventDefault();
    // console.log(values);

    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      setValues({ ...values, title: "", content: "", video: {} });

      setProgress(0);
      setUploadButtonText("Upload video");
      setVisible(false);

      setCourse(data);
      toast.success("✅ Lesson added");
    } catch (err) {
      console.log(err);
      toast.error("Lesson add failed");
    }
  };
  const handleVideoRemove = async () => {
    console.log("handle remove video");
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        values.video
      );
      console.log(data);
      setValues({ ...values, video: {} });
      setUploading(false);
      setUploadButtonText("Upload another video");
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video remove failed");
    }
  };

  const handlePublish = async () => {
    try {
      let answer = window.confirm(
        "Once you publish your course, it will be live for users to enroll"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/publish/${course._id}`);
      setCourse(data);
      toast.success("✅ Congrats! your course is now live");
    } catch (err) {
      toast.error("⚠️ Course publish failed... Try again");
    }
  };
  const handleUnpublish = async () => {
    try {
      let answer = window.confirm(
        "Once you unpublish your course, it will be not available for users to enroll"
      );
      if (!answer) return;
      toast("✅ Your course is unpublished");

      const { data } = await axios.put(`/api/course/unpublish/${course._id}`);
      setCourse(data);
    } catch (err) {
      toast.error("⚠️ Course unpublish failed... Try again");
    }
  };

  return (
    <InstructorRoutes>
      <div className="container-fluid pt-3 course-card">
        {/* <pre> {JSON.stringify(course, null, 4)} </pre> */}
        {course && (
          <div className="container-fluid pt-1">
            <div className="media flex-box pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "./Course.png"}
              />
              <div className="media-body pl-2">
                <div className="row">
                  <div className="col  description">
                    <h3 className="mt-2" style={{ color: "black" }}>
                      {course.name}
                    </h3>
                    <p
                      style={{
                        marginTop: "-10px",
                        color: "#777",
                        fontSize: "1.3rem",
                      }}
                    >
                      {course.lessons && course.lessons.length} Lessons{" "}
                    </p>
                    <p
                      style={{
                        marginTop: "-15px",
                        fontSize: "1.3rem",
                        color: "#777",
                      }}
                    >
                      {course.category}
                    </p>
                    <div className="row">
                      <div className="col mb-4">
                        <ReactMarkdown
                          children={course.description}
                          style={{
                            padding: "10px",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="">
                    <Tooltip
                      title={`${students} Enrolled`}
                      style={{ marginTop: "50%" }}
                    >
                      <UserSwitchOutlined className="h5 pointer p-icon text-info " />
                    </Tooltip>

                    <Tooltip title="Edit" style={{ marginTop: "50%" }}>
                      <EditOutlined
                        onClick={() =>
                          router.push(`/instructor/course/edit/${slug}`)
                        }
                        className="h5 pointer p-icon text-warning "
                      />
                    </Tooltip>

                    {course.lessons && course.lessons.length < 5 ? (
                      <Tooltip title="Min 5 lessons required to publish">
                        <QuestionOutlined className="h5 pointer text-danger p-icon" />
                      </Tooltip>
                    ) : course.published ? (
                      <Tooltip title="Unpublish">
                        <CloseOutlined
                          onClick={handleUnpublish}
                          className="h5 pointer p-icon text-danger"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Publish">
                        <CheckOutlined
                          onClick={handlePublish}
                          className="h5 pointer text-success"
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row btn-border pb-2">
              <Button
                onClick={() => setVisible(true)}
                className="col-md-6 offset-md-3 text-center btn-style"
                type="primay"
                icon={<UploadOutlined />}
                size="large"
              >
                Add Lesson
              </Button>
            </div>
            <Modal
              title="Add Lesson"
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <AddLessonForm
                values={values}
                setValues={setValues}
                handleAddLesson={handleAddLesson}
                uploading={uploading}
                uploadButtonText={uploadButtonText}
                handleVideo={handleVideo}
                progress={progress}
                handleVideoRemove={handleVideoRemove}
              />
            </Modal>

            <div className="row pb-5">
              <div className="col lesson-list">
                <h4>
                  {course && course.lessons && course.lessons.length} Lessons
                </h4>
                <List
                  itemLayout="horizontal"
                  dataSource={course && course.lessons}
                  renderItem={(item, index) => (
                    <Item className="display_flex_">
                      <Avatar style={{ marginRight: "10px" }}>
                        {index + 1}
                      </Avatar>
                      <Item.Meta
                        // avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                      ></Item.Meta>
                    </Item>
                  )}
                ></List>
              </div>{" "}
            </div>
          </div>
        )}
      </div>
    </InstructorRoutes>
  );
};
export default CourseView;
