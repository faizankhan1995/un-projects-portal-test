import React from "react";
import { Alert } from "antd";

import "./Navbar.scss";

const NotificationDrawer: React.FC = () => {
  return (
    <div
      className="notification-drawer"
      style={{ maxHeight: 400, overflow: "auto", margin: -11 }}
    >
      <Alert
        message="No New Notifications"
        description="You have no new notifications"
        type="info"
        closable={false}
      />
    </div>
  );
};

export default NotificationDrawer;
