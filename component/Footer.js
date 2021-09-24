import { React } from "react";
import { Button } from "antd";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Link from "next/link";

const Footer = () => {
  return (
    <div
      className="text-center"
      style={{
        marginTop: "50px",
      }}
    >
      <div
        className="row"
        style={{
          backgroundColor: "#202040",
          color: "white",

          overflow: "hidden",
        }}
      >
        {/* <div className="col-md-12 text-center">
          <img
            src="/logo.svg"
            className="text-center"
            style={{
              width: "200px",
              marginTop: "7vh",

              //       marginLeft: "15%",
            }}
          />
          <p className="" style={{ fontSize: "1.8rem" }}>
            By India, For{" "}
            <img
              src="/ind.png"
              style={{
                height: "50px",
                width: "50px",
              }}
            />
          </p>
        </div> */}
        <div
          className="row pt-3 text-center"
          style={{
            width: "100%",
            textAlign: "center",
            margin: "0",
            padding: "0",
          }}
        >
          <h2
            classNam="col-md-12   mx-auto"
            style={{ color: "white", padding: "0" }}
          >
            Mail us for any queries
          </h2>
          <a
            href="mailto:learnative.help@gmail.com"
            className="text-center"
            style={{ padding: "0" }}
          >
            <Button
              style={{
                backgroundColor: "#2e47ff",
                color: "white",
                borderColor: "#2e47ff",
              }}
              className="support-email"
            >
              learnative.help@gmail.com
            </Button>
          </a>
        </div>
        {/* <div className="mx-auto">
          <div className="footer-content row pl-2 pr-2 mx-auto">
            <div className="col-xl-2 col-lg-2 col-md-3">
              <h3>Navigation</h3>
              <span>
                <Link href="/landing">
                  <a>Landing Page</a>
                </Link>
              </span>
              <span>
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </span>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-3">Footer content </div>
            <div className="col-xl-2 col-lg-2 col-md-3">Footer content </div>
            <div className="col-xl-2 col-lg-2 col-md-3">Footer content </div>
            <div className="col-xl-4 col-lg-4 col-md-12">Footer content </div>
          </div>
        </div> */}
      </div>
      <div
        className="row  pt-2 pb-2"
        style={{
          backgroundColor: "#202040",
          color: "white",
          //   width: "100vw",
          overflow: "hidden",
        }}
      >
        <div
          className="text-center"
          style={{ fontSize: "2rem", borderBottomColor: "white" }}
        >
          {" "}
          <p style={{ marginBottom: "10px" }}>Follow us on</p>
          <p>
            <TwitterIcon id="social-icon" />
            <InstagramIcon id="social-icon" />
            <LinkedInIcon id="social-icon" />
            <FacebookIcon id="social-icon" className="footer-icon" />
          </p>
        </div>
        <div className="text-center">
          © Learnative.com - All Rights Reserved.
        </div>
      </div>
    </div>
  );
};
export default Footer;
