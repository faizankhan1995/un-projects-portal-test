import React, { Fragment } from "react";
import { Drawer } from "antd";

interface OptionsBarProps {
  option?: any;
  isVisible?: boolean;
  placement?: string;
  toogleVisibility: () => void;
}

const DrawerOptionsBar: React.FC<any> = (props: any) => {

  function onClose(values: any) {
    props.toogleVisibility();
  };

  return (
    <Fragment>
      <Drawer
        title="Applied Filters"
        placement='right'
        width={"290px"}
        closable
        onClose={onClose}
        visible={props.isVisible}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: "flex-start" }}>

          {props.children}

        </div>
      </Drawer>
    </Fragment>
  );
};
export default DrawerOptionsBar;

