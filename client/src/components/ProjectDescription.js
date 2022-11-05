import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dataActions from "../actions/dataActions";
import ProjectDescriptionNav from "./ProjectDescriptionNav";

const ProjectDescription = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataActions.getProject(params.projectId));
  }, []);
  const project = useSelector((state) => state.getproject.project);
  console.log(project);

  return (
    <div>
      <div class="sticky top-0">
        <ProjectDescriptionNav />
      </div>
      <div class="py-10 bg-[rgb(255,255,255)] h-screen">
        <div class="text-{rgb(26,14,171)} w-1/5 text-right mb-6">
          {project.name}
        </div>
        <div class="text-sm flex px-8 mb-3">
          <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
            Authors
          </div>
          <div></div>
        </div>
        <div class="text-sm flex px-8 mb-3">
          <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
            Publication date
          </div>
          <div>Hello</div>
        </div>
        <div class="text-sm flex px-8 mb-3">
          <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
            Journal
          </div>
          &nbsp;&nbsp;
          <div></div>
        </div>
        <div class="text-sm flex px-8 mb-3">
          <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
            Volume
          </div>
          <div></div>
        </div>
        <div class="text-sm flex px-8 mb-3">
          <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">Pages</div>
          <div></div>
        </div>
        <div class="text-sm flex px-8 mb-3">
          <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
            Publisher
          </div>
          <div>{project.userName}</div>
        </div>
        <div class="text-sm flex px-8 mb-3">
          <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
            Description
          </div>
          <div>{project.desciption}</div>
        </div>
        <div class="text-sm flex px-8 mb-3">
          <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
            Total citations
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
