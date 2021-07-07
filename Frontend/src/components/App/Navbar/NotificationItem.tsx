import React from "react";
import { Alert } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { NotificationModel } from "../../../models";

const NotificationItem: React.FC<NotificationModel> = (
  props: NotificationModel
) => {
  let notification = props;

  return (
    <div className="NotificationItem">
      <Alert
        message={<p>{notification.title}</p>}
        description={notification.message}
        type={notification.type}
        showIcon
        closeText={<CloseCircleOutlined />}
      />
    </div>
  );
};

export default NotificationItem;
