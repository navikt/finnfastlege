import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FastlegeContainer from "../containers/FastlegeContainer";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/fastlege" component={FastlegeContainer} />
        <Route path="/" component={FastlegeContainer} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
