import React, { useState } from "react";
import { Popover, Typography, Badge, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import NotificationDrawer from "./NotificationDrawers";
import "./Navbar.scss";

const { Title } = Typography;

const NavBar: React.FC<any> = (props) => {
  const [notificationDrawerVisibility, setNotificationDrawerVisibility] =
    useState(false);

  const content = <NotificationDrawer />;
  return (
    <div className="navbar">
      <Title level={3} style={{ color: "#fff", margin: "0px" }}>
        UN HABITAT Projects Portal
      </Title>
      <Popover
        className="notification-icon"
        placement="bottomLeft"
        trigger="click"
        visible={notificationDrawerVisibility}
        onVisibleChange={() =>
          setNotificationDrawerVisibility(!notificationDrawerVisibility)
        }
        content={content}
      >
        <Badge count={5} overflowCount={10}>
          <Button
            className="notification-icon-button"
            icon={<BellOutlined />}
          />
        </Badge>
      </Popover>
    </div>
  );
};

export default NavBar;
