import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import dataActions from "../actions/dataActions";

const Feed = (props) => {
  const projects = useSelector((state) => state.getprojects.projects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataActions.getProjects());
  }, []);

  return (
    <div class="m-60 mt-8">
      <div class="flex space-between justify-between mb-4 pb-2">
        <h1 class="font-bold text-3xl mb-2">&nbsp; &nbsp;Top Projects</h1>

        <Link to="/addproject" class="flex items-stretch ">
          <button class="flex  mr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Your Own Project!
          </button>
        </Link>
      </div>
      {projects.map((project) => {
        return (
          <ProjectCard
            id={project._id}
            name={project.name}
            description={project.description}
            githubRepo={project.githubRepo}
            techStack={project.techStack}
            colaborators={project.colaborators}
            votes={project.votes}
            colaboratorsLimit={project.colaboratorsLimit}
            user={project.user}
            userName={project.userName}
            requests={project.requests}
            colaboratorUsername={project.colaboratorsUsername}
          />
        );
      })}
    </div>
  );
};

export default Feed;
