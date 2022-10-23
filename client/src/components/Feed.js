import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import dataActions from "../actions/dataActions";

const Feed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataActions.getProjects());
  }, []);
  const projects = useSelector((state) => state.getprojects.projects);

  return (
    <div class="flex flex-col w-1/2 mt-4">
      <div class="flex flex-row space-between justify-between mb-4 pb-2 w-full">
        <h1 class="font-bold text-3xl mb-2">&nbsp; &nbsp;Top Projects</h1>

        <Link to="/addproject" class="flex items-stretch ">
          <button class="mr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 rounded focus:outline-none focus:shadow-outline">
            Add Your Own Project!
          </button>
        </Link>
      </div>
      <div class="w-full">
        {projects.map((project) => {
          return (
            <ProjectCard
              id={project._id}
              name={project.name}
              description={project.description}
              githubRepo={project.githubRepo}
              techStack={project.techStack}
              comments={project.comments}
              colaborators={project.colaborators}
              votes={project.votes}
              colaboratorsLimit={project.colaboratorsLimit}
              userName={project.userName}
              requests={project.requests}
              colaboratorsUsernames={project.colaboratorsUsernames}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
