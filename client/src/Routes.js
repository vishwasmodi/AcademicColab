import React from "react";
import {
  Route,
  Routes as Switch,
  BrowserRouter as Router,
} from "react-router-dom";

// import all the pages here
import AddProject from "./components/AddProject";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import CompleteDetails from "./components/CompleteDetails";
import ProjectDescription from "./components/ProjectDescription";
import Feedback from "./components/Feedback";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* <Route exact path='/route' component={Page} /> for all the pages */}
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Feed />} />
        <Route exact path="/completedetails" element={<CompleteDetails />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/addproject" element={<AddProject />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/projects/:projectId" element={<ProjectDescription />} />
        <Route exact path="/feedback" element={<Feedback />} />
      </Switch>
    </Router>
  );
};

export default Routes;
