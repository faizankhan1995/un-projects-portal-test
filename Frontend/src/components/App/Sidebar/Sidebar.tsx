import React from "react";
// const { app } = require('electron')
import { Link } from "react-router-dom";
import { Menu, Avatar, Button } from "antd";
import "./Sidebar.scss";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";

const SideBar: React.FC = () => {
  let menuItemId = 1;

  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <Avatar className="sidebar-title-avatar" icon={<UserOutlined />} />
      </div>

      <Menu
        inlineIndent={5}
        theme="dark"
        mode="inline"
        className="sidebar-menu"
      >
        <Menu.Item key={menuItemId++}>
          <Link to="/projects-portal/dashboard">
            <span className="nav-text">Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={menuItemId++}>
          <Link to="/projects-portal/projects">
            <span className="nav-text">Projects</span>
          </Link>
        </Menu.Item>
      </Menu>

      <div className="sidebar-footer">
        <Button type="primary" block icon={<PoweroffOutlined />}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
