import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import "./index.css";
import Footer from "../component/Footer";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import Topnav from "../component/Topnav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider>
        <ToastContainer position="top-center" transition={Flip} />
        <Topnav className="top-nav2" />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}
export default MyApp;
