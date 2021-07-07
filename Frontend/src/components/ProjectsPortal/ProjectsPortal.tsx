import "./ProjectsPortal.scss";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Result } from "antd";
import Projects from "./Projects";

const SalesCrm: React.FC<{ isError: boolean }> = (props: {
  isError: boolean;
}) => {
  let { path } = useRouteMatch();

  if (props.isError) {
    return (
      <Result
        style={{ marginTop: "15%" }}
        status="error"
        title="Failed to Fetch Data"
        subTitle="Please check your connection and try again."
      />
    );
  }
  return (
    <div className="SalesCrm">
      <Switch>
        <Route exact path={`${path}/dashboard`}>
          <h1> Main Dashboard </h1>
        </Route>

        <Route path={`${path}/projects`}>
          <Projects />
        </Route>
      </Switch>
    </div>
  );
};

export default SalesCrm;
