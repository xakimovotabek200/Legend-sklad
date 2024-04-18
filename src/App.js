import React, { useEffect } from "react";
import { Layout, theme } from "antd";
import Sidebar from "./components/sidebar/Sidebar";
import Pagess from "./components/pages/routes";
import Loginpage from "./components/pages/loginpage/Loginpage";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Content } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Form submitted:", event.target[0].value);
  };

  useEffect(() => {
    if (!token) {
      navigate("/loginpage");
    }
  }, [token]);

  if (token) {
    return (
      <Layout>
        <Sidebar />
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          ></Header>
          <Content
            className="h-full overflow-y-scroll"
            style={{
              margin: "24px 16px 0",
            }}
          >
            <div
              style={{
                height: "84vh",
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Pagess />
            </div>
          </Content>
        </Layout>
        <ToastContainer />
      </Layout>
    );
  } else {
    return <Loginpage />;
  }
};

export default App;
