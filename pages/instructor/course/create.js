import axios from "axios";
import InstructorRoutes from "../../../component/routes/InstructorRoute";
import { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import CourseCreateForm from "../../../component/forms/CourseCreateForm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const CourseCreate = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "999",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
  });

  const [preview, setPreview] = useState("");
  const [image, setImage] = useState({});
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const router = useRouter();
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

  const handleImageRemove = async (e) => {
    e.preventDefault();
    // console.log("REMOVE IMAGE");
    try {
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast.error("Image upload failed... Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    try {
      const { data } = await axios.post("/api/course", {
        ...values,
        image,
      });
      toast.success("Great ! Now you can start adding lessons");
      router.push("/instructor");
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed... Try again.");
    }
  };
  return (
    <InstructorRoutes>
      <h1 className="jumbotron text-center square">Create Course</h1>
      <div className="pt-3 pb-3 ">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          handleImageRemove={handleImageRemove}
        />
      </div>
      {/* <pre> {JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre> {JSON.stringify(image, null, 4)}</pre> */}
    </InstructorRoutes>
  );
};
export default CourseCreate;
