import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import App from './App';
// import Login from "./Components/Layout/Login";
import Dashboard from "./Components/Layout/Dashboard";
import Report from "./Components/Layout/Report";

const AppRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/report" component={Report} />
    </div>
  </Router>
);

export default AppRouter;
