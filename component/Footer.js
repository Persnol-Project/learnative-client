import { React } from "react";
import { Button } from "antd";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
const Footer = () => {
  return (
    <div
      style={{
        marginTop: "50px",
      }}
    >
      <div
        className="row"
        style={{
          backgroundColor: "#202040",
          color: "white",
          //   width: "100vw",
          overflow: "hidden",
        }}
      >
        <div className="col-md-12 text-center">
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
        </div>
        <div className="row pt-2 pb-2 text-center">
          <div
            className="col-md-6"
            style={{
              borderRight: "2px solid #777",
            }}
          >
            <p style={{ fontSize: "1.5rem" }}>Legal</p>

            <p style={{ fontSize: "1rem" }}>
              <a className="footer-link">Terms & Conditions</a>
            </p>
            <p style={{ fontSize: "1rem" }}>
              <a className="footer-link">Priavcy Policy</a>
            </p>
          </div>
          <div className="col-md-6">
            <p style={{ fontSize: "1.5rem" }}>For instructors</p>

            <p style={{ fontSize: "1rem" }}>
              <a className="footer-link">FAQs</a>
            </p>
            <p style={{ fontSize: "1rem" }}>
              <a className="footer-link">Resources</a>
            </p>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-6 text-center"
            style={{
              borderRight: "2px solid #777",
            }}
          >
            <p style={{ fontSize: "1.5rem" }}>Contact us </p>
            <Button
              style={{
                backgroundColor: "#2e47ff",
                color: "white",
                borderColor: "#2e47ff",
              }}
            >
              support@lernative.com
            </Button>
          </div>
          <div className="col-md-6 text-center">
            <p style={{ fontSize: "1.5rem" }}>Address</p>
            <div>
              <p
                style={{
                  fontSize: "1rem",
                  marginTop: "0",
                  marginBottom: "0",
                }}
              >
                Address line-1
              </p>
              <p style={{ fontSize: "1rem", margin: "0" }}>Address line-2</p>
              <p style={{ fontSize: "1rem", margin: "0" }}>City,State-360XXX</p>
            </div>
          </div>
        </div>
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
        <div className="text-center" style={{ fontSize: "2rem" }}>
          {" "}
          <p style={{ marginBottom: "10px" }}>Follow us on</p>
          <p>
            <TwitterIcon id="social-icon" />
            <InstagramIcon id="social-icon" />
            <LinkedInIcon id="social-icon" />
            <FacebookIcon id="social-icon" />
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
