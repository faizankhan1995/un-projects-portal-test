import "./App.scss";
import "./formStyles.scss";
import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Layout } from "antd";
import NavBar from "./Navbar";
import SideBar from "./Sidebar";
import Login from "../Auth/Login";
import ProjectsPortal from "../ProjectsPortal/ProjectsPortal";
import { GlobalOutlined, MailFilled, PhoneFilled } from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;
const App: React.FC = () => {
  const [isError, setIsError] = useState<boolean>(false);

  async function fetchInitailData() {}

  fetch(`${process.env.REACT_APP_ServiceEndpoint}`)
    .then(() => {
      // Backend Runnning, Fetch initial data if any
      fetchInitailData();
    })
    .catch(() => {
      setIsError(true);
    });

  return (
    <Layout className="App">
      <Sider breakpoint="lg" collapsedWidth={80} width={160}>
        <SideBar />
      </Sider>
      <Layout style={{ background: "lightgray" }}>
        <Header>
          <NavBar />
        </Header>

        <Layout style={{ background: "lightgray" }}>
          <Content>
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              {/* {!user?.name && <Redirect to={{ pathname: "/login" }} /> } */}
              <Route path={"/projects-portal"}>
                <ProjectsPortal isError={isError} />
              </Route>

              <Route path="*">
                <Redirect to={{ pathname: "/login" }} />
              </Route>
            </Switch>

            <Footer>
              <span>
                <PhoneFilled />
                <a href="tel:+92-3315890467" style={{ color: "black" }}>
                  +92-331-589067
                </a>
                {/* <Text > +92-331-5890467</Text> */}
              </span>
              <a
                href="https://khanfaizan.com/"
                style={{ color: "black" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Copyright {new Date().getFullYear()} © Faizan Khan
                <GlobalOutlined />
              </a>
              <span>
                <a
                  href="mailto: faizankhan247@live.com?subject=UN HABITAT Projects Portal Inquiry"
                  style={{ color: "black" }}
                >
                  faizankhan247@live.com
                </a>
                <MailFilled />
              </span>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
