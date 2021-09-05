import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import user from "../../server/models/user";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    state: { user },
  } = useContext(Context);
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      // console.table("Register responce", data);
      toast.success("✅ Registeration Successful... Please Login");
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      var s = err.response.data;
      toast.error(`❌ ${s}`);
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square mb-3">Register</h1>
      <div className="container row col-md-12 pb-5 mx-auto pt-2">
        <img src="register.svg" className="col-md-6 mr-2 p-2" />

        <div className="col-md-6 my-auto">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
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
              disabled={!name || !email || !password || loading}
              style={{
                backgroundColor: "#2E47FF",
                borderColor: "#2E47FF",
                color: "white",
              }}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </form>
          <p
            className="text-center p-3"
            style={{
              fontWeight: "550",
            }}
          >
            Already registerd?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Register;
