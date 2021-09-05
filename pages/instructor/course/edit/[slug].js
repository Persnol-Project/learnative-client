import axios from "axios";
import InstructorRoutes from "../../../../component/routes/InstructorRoute";
import { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import CourseCreateForm from "../../../../component/forms/CourseCreateForm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { List, Avatar, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const { Item } = List;
import UpdateLessonForm from "../../../../component/forms/UpdateLessonForm";
const CourseEdit = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "999",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    lessons: [],
  });

  const [preview, setPreview] = useState("");
  const [image, setImage] = useState({});
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState("Upload Video");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setValues(data);
    if (data.image) setImage(data.image);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast.error("Image upload failed... Try again.");
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    try {
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image,
      });
      toast.success("✅ Course updated!");
      router.push("/instructor");
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed... Try again.");
    }
  };

  const handleDrag = (e, index) => {
    e.dataTransfer.setData("ItemIndex", index);
  };
  const handleDrop = async (e, index) => {
    const movingItemIndex = e.dataTransfer.getData("ItemIndex");
    const targetItemIndex = index;
    let allLessons = values.lessons;
    let movingItem = allLessons[movingItemIndex];
    allLessons.splice(movingItemIndex, 1);
    allLessons.splice(targetItemIndex, 0, movingItem);
    if (data) setValues({ ...values, lessons: [...allLessons] });
    //save to database
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image,
    });
    console.log(data);
    toast.success("Lessons rearranged successfully");
  };

  const handleDelete = async (index) => {
    const answer = window.confirm("Are you sure you want to delete?");
    if (!answer) return;
    let allLessons = values.lessons;
    const removed = allLessons.splice(index, 1);
    setValues({ ...values, lessons: allLessons });

    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
    console.log(data);
    if (data.ok) toast.success("Deleted video");
  };

  const handleVideo = async (e) => {
    //remove previous video
    if (current.video && current.video.Location) {
      const res = await axios.post(
        `/api/course/video-remove/${values.instructor._id}`,
        current.video
      );

      console.log("Removed", res);
    }
    //upload new video
    const file = e.target.files[0];
    setUploadVideoButtonText(file.name);
    setUploading(true);

    const videoData = new FormData();
    videoData.append("video", file);
    videoData.append("courseId", values._id);
    const { data } = await axios.post(
      `/api/course/video-upload/${values.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) =>
          setProgress(Math.round((100 * e.loaded) / e.total)),
      }
    );
    console.log(data);
    setCurrent({ ...current, video: data });
    setUploading(false);
  };
  const handleUpdateLesson = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    setUploadVideoButtonText("Upload Video");
    setVisible(false);
    toast.success("Lesson Updated");
    // setCourse(data);

    if (data.ok) {
      let arr = values.lessons;
      const index = arr.findIndex((ele) => ele._id === current._id);
      arr[index] = current;
      setValues({ ...values, lessons: arr });
    }
  };
  return (
    <InstructorRoutes>
      <h1 className="jumbotron text-center square">Update Course</h1>
      {/* {JSON.stringify(values)} */}
      <div className="pt-3 pb-3 ">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          editPage={true}
        />
      </div>
      <hr />
      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>{values && values.lessons && values.lessons.length} Lessons</h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => (
              <Item
                className="display_flex_"
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                {/* <Avatar style={{ marginRight: "10px" }}>{index + 1}</Avatar> */}

                <Item.Meta
                  onClick={() => {
                    setVisible(true);
                    setCurrent(item);
                  }}
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                ></Item.Meta>
                <DeleteOutlined
                  onClick={() => handleDelete(index)}
                  className="text-danger float-right"
                />
              </Item>
            )}
          ></List>
        </div>
      </div>
      <Modal
        title="Update lesson"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UpdateLessonForm
          current={current}
          setCurrent={setCurrent}
          handleVideo={handleVideo}
          handleUpdateLesson={handleUpdateLesson}
          uploadVideoButtonText={uploadVideoButtonText}
          uploading={uploading}
          progress={progress}
        />
      </Modal>
      {/* <pre> {JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre> {JSON.stringify(image, null, 4)}</pre> */}
    </InstructorRoutes>
  );
};
export default CourseEdit;
