import { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { useRouter } from "next/router";
import { Badge, Modal } from "antd";
import { currencyFormatter } from "../../utils/helpers";
import SingleCourseJumbotron from "../../component/cards/SingleCourseJumbotron";
import SingleCourseLessons from "../../component/cards/SingleCourseLessons";
import PreviewModal from "../../component/modal/PreviewModal";
import { Context } from "../../context";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const SingleCourse = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState([]);

  const router = useRouter();
  const { slug } = router.query;
  const {
    state: { user },
  } = useContext(Context);
  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    console.log(data);
    setEnrolled(data);
  };

  useEffect(() => {
    if (user && course) checkEnrollment();
  }, [user, course]);

  const handlePaidEnrollment = async () => {
    console.log("paid enrollement");

    try {
      setLoading(true);
      if (!user) router.push("/login");
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      stripe.redirectToCheckout({ sessionId: data });
    } catch (err) {
      toast.error("❌ Enrollment failed... Try again...");
      console.log(err);
      setLoading(false);
    }
  };
  const handleFreeEnrollment = async (e) => {
    console.log("free enrollement");
    e.preventDefault();
    try {
      if (!user) router.push("/login");
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      setLoading(true);
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
      toast.success("✅ " + data.message);
      setLoading(false);
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      toast.error("❌ Enrollment failed... Try again...");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid pb-4">
        <div className="row">
          <SingleCourseJumbotron
            course={course}
            showModal={showModal}
            setShowModal={setShowModal}
            preview={preview}
            setPreview={setPreview}
            user={user}
            loading={loading}
            handlePaidEnrollment={handlePaidEnrollment}
            handleFreeEnrollment={handleFreeEnrollment}
            enrolled={enrolled}
            setEnrolled={setEnrolled}
          />
          <PreviewModal
            showModal={showModal}
            setShowModal={setShowModal}
            preview={preview}
          />
        </div>
      </div>
      {course.lessons && (
        <SingleCourseLessons
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);

  return {
    props: {
      course: data,
    },
  };
}
export default SingleCourse;
