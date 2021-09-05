import { Menu } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  WindowsFilled,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useState, useEffect, useContext } from "react";

import { Context } from "../context/index";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const { SubMenu, Item, ItemGroup, Divider } = Menu;
const Topnav = () => {
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    //console.log(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  const router = useRouter();
  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast("✅" + data.message);
    router.push("/login");
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[current]}
      className="top-nav1 mb-2 nav "
    >
      <Item
        key="/landing"
        onClick={(e) => setCurrent(e.key)}
        //icon={<AppstoreOutlined />}
      >
        <Link href="/landing">
          <a className="top-nav nav">
            {" "}
            <img
              className="pt-2"
              src="/logo.svg"
              style={{
                height: "50px",
                width: "100px",
              }}
            />
          </a>
        </Link>
      </Item>

      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        //icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a className="top-nav nav">
            {" "}
            <AppstoreOutlined id="icon" /> App
          </a>
        </Link>
      </Item>

      {user && user.role && user.role.includes("Instructor") ? (
        <Item
          key="/instructor/course/create"
          onClick={(e) => setCurrent(e.key)}
          //icon={<LoginOutlined />}
        >
          <Link href="/instructor/course/create">
            <a className="top-nav nav">
              <CreateNewFolderIcon id="icon" />
              Create Course
            </a>
          </Link>
        </Item>
      ) : (
        <Item
          key="/user/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          //icon={<LoginOutlined />}
        >
          <Link href="/user/become-instructor">
            <a className="top-nav nav">
              <TeamOutlined id="icon" />
              Become Instructor
            </a>
          </Link>
        </Item>
      )}

      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            //icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a className="top-nav nav">
                <LoginOutlined id="icon" />
                Login
              </a>
            </Link>
          </Item>
          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            //icon={<UserAddOutlined />}
          >
            <Link href="/register">
              <a className="top-nav nav">
                <UserAddOutlined id="icon" />
                Register
              </a>
            </Link>
          </Item>
        </>
      )}
      {user !== null && (
        <>
          {/* <CoffeeOutlined /> */}
          <SubMenu
            className="float-right nav"
            //id="right"
            title={user && user.name}
            icon={<AccountCircleIcon />}
          >
            <ItemGroup>
              <Item key="/user">
                <Link href="/user">
                  <a>Dashboard</a>
                </Link>
              </Item>
              <Item onClick={logout}>Logout</Item>
            </ItemGroup>
          </SubMenu>
        </>
      )}
      {user && user.role && user.role.includes("Instructor") && (
        <Item
          key="/instructor"
          onClick={(e) => setCurrent(e.key)}
          className="float-right nav"
          //icon={<LoginOutlined />}
        >
          <Link href="/instructor">
            <a className="top-nav">
              <TeamOutlined id="icon" />
              Instructor
            </a>
          </Link>
        </Item>
      )}
      {/* <Item key="/">
        <img src="logo.png" style={{ width: "100px", height: "100px" }} />
      </Item> */}
    </Menu>
  );
};
export default Topnav;
