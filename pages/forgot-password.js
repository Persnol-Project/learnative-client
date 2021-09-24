import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassowrd] = useState("");
  const [loading, setLoading] = useState(false);

  //logged in ko nahi dikhana
  const {
    state: { user },
  } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast.success("✅ Check your email for the secret code");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      var s = err.response.data;
      toast.error(`❌ ${s}`);
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log(email, code, newPassword);
    //return;
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassowrd("");
      toast.success("✅ Password Reset");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      var s = err.response.data;
      toast.error(`❌ ${s}`);
    }
  };
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">
        Forgot Password
      </h1>

      <div className="container row col-md-12 mx-auto  pb-5 pt-3">
        <img src="forgot_password.svg" className="col-md-6 mr-5 p-2" />
        <div className="col-md-6 my-auto">
          <form onSubmit={success ? handleResetPassword : handleSubmit}>
            <input
              type="email"
              className="form-control mb-4 p-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
            {success && (
              <>
                <input
                  type="text"
                  className="form-control mb-4 p-4"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter secret code"
                  required
                />
                <input
                  type="password"
                  className="form-control mb-4 p-4"
                  value={newPassword}
                  onChange={(e) => setNewPassowrd(e.target.value)}
                  placeholder="Enter new Password"
                  required
                />
              </>
            )}
            <br />
            <button
              type="submit"
              className="btn btn-block btn-primary form-control width100 p-2 getting-started"
              disabled={loading || !email}
            >
              {loading ? (
                <SyncOutlined spin className="my-2" />
              ) : (
                <div className="my-2">Submit</div>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
