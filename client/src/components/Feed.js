import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import dataActions from "../actions/dataActions";
import plus from "../static/plus.png";
import Nav from "./Nav";
import Sidebar from "../components/Sidebar";
import { CometChat } from "@cometchat-pro/chat";
import Loader from "./Loader";

const Feed = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(dataActions.getProjects()).then(() => {
      setLoading(false);
    });
  }, []);
  const projects = useSelector((state) => state.getprojects.projects);

  return (
    <div>
      <div class="sticky top-0">
        <Nav />
      </div>
      <div class="flex">
        <Sidebar />
        {/* <Messenger /> */}

        <div class="flex flex-col mt-4 w-1/2">
          <div class="flex flex-row space-between justify-between mb-4 pb-1 w-full">
            <h1 class="font-bold text-2xl mb-2">&nbsp; &nbsp;Top Projects</h1>

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
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
