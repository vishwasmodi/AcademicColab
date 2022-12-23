import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import dataActions from "../actions/dataActions";
import plus from "../static/plus.png";
import Nav from "./Nav";
import Sidebar from "../components/Sidebar";
import Loader from "./Loader";
import { cometChatLogin } from "../config/comet-chat";
import { auth, logoutFirebase } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  CometChatUserList,
  CometChatUI,
  CometChatConversationList,
  CometChatConversationListWithMessages,
} from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src";

const Feed = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [user, error] = useAuthState(auth);

  useEffect(() => {
    setLoading(true);
    dispatch(dataActions.getProjects()).then(() => {
      setLoading(false);
    });
    cometChatLogin(user);
  }, []);

  const handleMyFeed = () => {
    setLoading(true);
    dispatch(dataActions.filterProjects(["my-interests"])).then(() => {
      setLoading(false);
    });
  };

  const handleExplore = () => {
    setLoading(true);
    dispatch(dataActions.filterProjects([])).then(() => {
      setLoading(false);
    });
  };
  const projects = useSelector((state) => state.getprojects.projects);

  return (
    <div class="w-screen relative ">
      <div class="sticky top-0">
        <Nav />
      </div>
      <div class="flex w-full">
        <div class="sticky w-1/4 top-0">
          <Sidebar />
        </div>
        <div class="flex flex-col mt-4 w-1/2">
          <div class="flex flex-row space-between justify-between mb-4 pb-1 w-full">
            <div class="flex flex-row">
              <button
                class="text-xl px-2 py-1 hover:bg-gray-200"
                onClick={handleMyFeed}
              >
                My Feed
              </button>
              &nbsp; &nbsp;&nbsp; &nbsp;
              <button
                class="text-xl px-2 py-1 hover:bg-gray-200"
                onClick={handleExplore}
              >
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
        <div class="h-[94%] overflow-hidden fixed right-0">
          <Link to="/chat">
            <CometChatUI />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feed;
