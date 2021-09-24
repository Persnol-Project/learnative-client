import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      console.table("Login responce", data);
      dispatch({ type: "LOGIN", payload: data });
      //toast.success("✅ Registeration Successful... Please Login");
      window.localStorage.setItem("user", JSON.stringify(data));
      router.push("/user");
      //setLoading(false);
    } catch (err) {
      var s = err.response.data;
      toast.error(`❌ ${s}`);
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Login</h1>
      <div className="container row col-md-12 pb-5 mx-auto pt-2">
        <img src="login.svg" className="col-md-6 mr-2 p-2" />
        <div className="col-md-6 my-auto">
          <form onSubmit={handleSubmit} className="mt-5  mx-auto">
            <input
              type="email"
              className="form-control mb-4 p-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
            <input
              type="password"
              className="form-control mb-4 p-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button
              type="submit"
              className="btn btn-block btn-primary form-control width100 p-2 getting-started"
              disabled={!email || !password || loading}
              style={{
                backgroundColor: "#2E47FF",
                borderColor: "#2E47FF",
                color: "white",
              }}
            >
              {loading ? <SyncOutlined spin className="mb-2" /> : "Submit"}
            </button>
          </form>
          <p
            className="text-center pt-3"
            style={{
              fontWeight: "550",
            }}
          >
            Not yet registerd?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>
          <p
            className="text-center"
            style={{
              fontWeight: "550",
            }}
          >
            <Link href="/forgot-password">
              <a className="text-danger">Forgot Password</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
