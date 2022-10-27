import React from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
// import Messenger from "../components/Messenger";
import Nav from "../components/Nav";

const Home = () => {
  return (
    <div>
      <div class="sticky top-0">
        <Nav />
      </div>
      <div class="flex">
        <Sidebar />
        <Feed />
        {/* <Messenger /> */}
      </div>
    </div>
  );
};

export default Home;
