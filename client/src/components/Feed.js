import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import dataActions from "../actions/dataActions";
import plus from "../static/plus.png";
import Nav from "./Nav";
import Sidebar from "../components/Sidebar";
import Loader from "./Loader";
import {
  CometChatUserList,
  CometChatConversationList,
  CometChatConversationListWithMessages,
} from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src";

const Feed = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(dataActions.getProjects()).then(() => {
      setLoading(false);
    });
  }, []);
  const projects = useSelector((state) => state.getprojects.projects);

  return (
    <div class="w-screen ">
      <div class="sticky top-0">
        <Nav />
      </div>
      <div class="flex w-full h-screen">
        <Sidebar class="w-1/4" />
        {/* <Messenger /> */}

        <div class="flex flex-col mt-4 w-1/2">
          <div class="flex flex-row space-between justify-between mb-4 pb-1 w-full">
            <div class="flex flex-row">
              <button class="text-xl px-2 py-1 hover:bg-gray-200">
                My Feed
              </button>
              &nbsp; &nbsp;&nbsp; &nbsp;
              <button class="text-xl px-2 py-1 hover:bg-gray-200">
                Explore
              </button>
            </div>
            <Link to="/addproject" class="flex items-stretch">
              <button class="flex px-1 hover:bg-gray-200 text-black font-bold rounded focus:outline-none focus:shadow-outline">
                <img src={plus} class="h-6 w-6 mt-1 mr-1" />
                <span class="mt-1">Add Project</span>
              </button>
            </Link>
          </div>
          <div class="w-full">
            {loading ? (
              <Loader />
            ) : (
              <div>
                {projects.map((project) => {
                  return (
                    <ProjectCard
                      id={project._id}
                      name={project.name}
                      description={project.description}
                      link={project.githubRepo}
                      comments={project.comments}
                      userName={project.userName}
                      requests={project.requests}
                      colaboratorsDetails={project.colaboratorsDetails}
                      interests={project.interests}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div class="w-1/4 h-5/6 overflow-hidden ml-4 ">
          <Link to="/chat">
            <CometChatUserList class="overflow-hidden " />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feed;
