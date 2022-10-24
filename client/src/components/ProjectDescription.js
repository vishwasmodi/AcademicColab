import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dataActions from "../actions/dataActions";

const ProjectDescription = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataActions.getProject(params.projectId));
  }, []);
  const project = useSelector((state) => state.getproject.project);
  console.log(project);

  return (
    <div class="ml-40">
      <div class="text-{rgb(26,14,171)}">{project.name}</div>
      <div class="text-sm flex">
        <div class="text-{rgb(119,119,119)} text-right px-4">Authors</div>{" "}
        &nbsp;&nbsp;
        <div></div>
      </div>
      <div class="text-sm flex px-8">
        <div class="text-{rgb(119,119,119)} text-right">Publication date</div>{" "}
        &nbsp;&nbsp;
        <div></div>
      </div>
      <div class="text-sm flex px-8">
        <div class="text-{rgb(119,119,119)} text-right">Journal</div>{" "}
        &nbsp;&nbsp;
        <div></div>
      </div>
      <div class="text-sm flex px-8">
        <div class="text-{rgb(119,119,119)} text-right">Volume</div>{" "}
        &nbsp;&nbsp;
        <div></div>
      </div>
      <div class="text-sm flex px-8">
        <div class="text-{rgb(119,119,119)} text-right">Pages</div> &nbsp;&nbsp;
        <div></div>
      </div>
      <div class="text-sm flex">
        <div class="text-{rgb(119,119,119)} text-right px-8">Publisher</div>{" "}
        &nbsp;&nbsp;
        <div>{project.userName}</div>
      </div>
      <div class="text-sm flex px-8">
        <div class="text-{rgb(119,119,119)} text-right">Description</div>{" "}
        &nbsp;&nbsp;
        <div>{project.desciption}</div>
      </div>
      <div class="text-sm flex px-8">
        <div class="text-{rgb(119,119,119)} text-right">Total citations</div>{" "}
        &nbsp;&nbsp;
        <div></div>
      </div>
    </div>
  );
};

export default ProjectDescription;
