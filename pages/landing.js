import PropagateLoader from "react-spinners/PropagateLoader";
import ReactTypingEffect from "react-typing-effect";
import {
  UilWindow,
  UilBookReader,
  UilAward,
  UilChatInfo,
} from "@iconscout/react-unicons";
const Landing = () => {
  return (
    <>
      {/* <PropagateLoader size={35} className="mx-auto" />
      <br /> */}

      <div
        className="hero mb-4"
        // style={{ height: "100vh" }}
      >
        <div className="row">
          <div
            className="col-md-6 text-center mx-auto"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
            }}
          >
            <div
              className="instructor-box m-4"
              style={{
                marginTop: "0px",
                fontSize: "1.8rem",
              }}
            >
              Learnative
              <br />{" "}
              <ReactTypingEffect
                speed={300}
                eraseSpeed={300}
                text={[
                  "Learn new skills",
                  "Prepare for tommorow",
                  "Become Instructor",
                  "Learn from the best",
                  "Get exposure",
                ]}
              />
            </div>
          </div>
          <div className="col-md-6 text-center mx-auto m-4">
            <img
              className="mx-auto"
              src="/sync.svg"
              style={{
                width: "100%",
                zIndex: "5",
                maxWidth: "500px",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 features row mx-auto">
        <div
          className="feature1 col-md-3 text-center p-1 mb-1"
          style={{
            fontSize: "1rem",
            marginBottom: "50px",
            background: "#5465DF",
            color: "white",
          }}
        >
          <div style={{ fontSize: "1.5rem" }}>
            <UilWindow />
            <br /> Learn practical courses
          </div>
          Best for school students, to learn practical skills.
        </div>

        <div
          className="feature1 col-md-3 text-center p-1 mb-1"
          style={{
            fontSize: "1rem",
            marginBottom: "40px",
            background: "#5465DF",
            color: "white",
          }}
        >
          <div style={{ fontSize: "1.5rem" }}>
            <UilAward />
            <br /> Become Instructor
          </div>
          If you want to grow as an Instructor/Creator, Learnative is the best
          platform for you.
        </div>

        <div
          className="feature1 col-md-3 text-center p-1 mb-1"
          style={{
            fontSize: "1rem",
            marginBottom: "40px",
            background: "#5465DF",
            color: "white",
          }}
        >
          <div style={{ fontSize: "1.5rem" }}>
            <UilBookReader />
            <br /> Best platform for schools
          </div>
          Schools can have a good platform and publish their courses here,
          resulting in increased exposure for all the students.
        </div>
        <div
          className="feature1 col-md-3 text-center p-1 mb-1"
          style={{
            fontSize: "1rem",
            marginBottom: "40px",
            background: "#5465DF",
            color: "white",
          }}
        >
          <div style={{ fontSize: "1.5rem" }}>
            <UilChatInfo />
            <br /> Full Support
          </div>
          Messege or Mail any time for any support related queries
        </div>
      </div>
      <div className=" row mt-4">
        <div className="landing_subscription col-md-6 offset-md-3 mb-5">
          <h3 className="text-center">Subscription Model for Schools</h3>
          <img
            src="/landing_school.svg"
            style={{ width: "50%" }}
            className="mx-auto mb-2 mt-2"
          />
          <h3 className="text-center">Perks</h3>
          <div
            className="perks "
            style={{
              fontSize: "1.2rem",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <div>✅ Get upto 30 Instructor accounts</div>
            <div>✅ The complete solution for E-learning</div>
            <div>✅ Get the exposure for your students</div>
            <div>✅ Get customised Certificates for required courses</div>
            <div>✅ Get the personalised analysis of data of your students</div>
            <div>
              ✅ Get Support and full setup with feedbacks on initial videos
            </div>
            <div>
              ✅ All of these plus many more features... at a very pocket
              friendly price
            </div>
            <div className="text-center" style={{ fontSize: "2rem" }}>
              Only ₹1/month*
            </div>
            <div className="text-center" style={{ fontSize: "0.9rem" }}>
              *for each student
            </div>
          </div>
          <a
            target="blank"
            href="https://forms.gle/LcR2dchw48K5zYUM9"
            className="mx-auto"
          >
            <button className="btn btn-block forms">
              <img
                src="./g_form.png"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                }}
              />
            </button>
          </a>
        </div>
      </div>
      <div className="row mt-4">
        <div className="landing_subscription col-md-6 offset-md-3">
          <h3 className="text-center">Subscription Model for Instructors</h3>
          <img
            src="/landing_creator.svg"
            style={{ width: "50%" }}
            className="mx-auto mb-2 mt-2"
          />
          <h3 className="text-center">Perks</h3>
          <div
            className="perks "
            style={{
              fontSize: "1.2rem",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <div>
              ✅ Get to design course with full freedom as per community
              guidelines
            </div>
            <div>
              ✅ Get maximum payout from your paid course compared to any other
              platform
            </div>
            <div>✅ Get your initial userbase from the platform</div>
            <div>
              ✅ Dont worry if you are new in this field, Learnative is begineer
              friendly{" "}
            </div>
            <div>✅ Get the personalised analysis of data of your students</div>
            <div>
              ✅ Get Support and full setup with feedbacks on initial videos
            </div>
            <div>
              ✅ All of these plus many more features... at a very pocket
              friendly price
            </div>
            <div className="text-center" style={{ fontSize: "2rem" }}>
              Only ₹0*
            </div>
            <div className="text-center" style={{ fontSize: "0.8rem" }}>
              *for each paid course sale 30% will be platform fee, including 3%
              transaction fee, while rest 70% will be your income.
            </div>
          </div>
          <a
            target="_blank"
            href="https://forms.gle/7VbR5LEgVYrya1kZ8"
            className="mx-auto"
          >
            <button className="btn btn-block forms">
              <img
                src="./g_form.png"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                }}
              />
            </button>
          </a>
        </div>
      </div>
      {/* <div className="row">
        <div
          className="text-center"
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            margin: "0",
          }}
        >
          <p>Sorry...</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            className="col-md-10 text-center mb-3"
            src="/under_construction.svg"
            style={{
              height: "80%",
              width: "80%",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </div>
        <div
          className="text-center"
          style={{
            fontSize: "2rem",
            fontWeight: "500",
            margin: "0",
          }}
        >
          <p>Our Landing page is under construction</p>
          <p>We will be live soon...</p>
          <p>Thank you.</p>
        </div>
      </div> */}
    </>
  );
};
export default Landing;
