const Landing = () => {
  return (
    <>
      {/* <div className="landing-nav">
        <header>
          <a href="#" class="logo">
            Logo
          </a>
          <div class="mean-toggle"></div>
          <nav>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Term</a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
          <div class="clear"></div>
        </header>
      </div> */}
      <div className="row">
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
      </div>
    </>
  );
};
export default Landing;
