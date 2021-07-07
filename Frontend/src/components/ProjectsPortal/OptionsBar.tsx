import React, { Fragment } from "react";
import { Row, Col } from "antd";

interface OptionsBarProps {
  left?: any;
  middle?: any;
  right?: any;
}

const OptionsBar: React.FC<OptionsBarProps> = (props: OptionsBarProps) => {
  return (
    <Fragment>
      <Row className="options-bar">
        <Col span={8} className="options-bar-left-options">
          {props.left}
        </Col>
        <Col
          span={8}
          className="options-bar-middle-options"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {props.middle}
        </Col>
        <Col
          span={8}
          className="options-bar-right-options"
          style={{ textAlign: "center" }}
        >
          {props.right}
        </Col>
      </Row>
    </Fragment>
  );
};
export default OptionsBar;
