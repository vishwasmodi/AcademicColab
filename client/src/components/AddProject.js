import React, { useState } from "react";
import { useDispatch } from "react-redux";
import dataActions from "../actions/dataActions";
import { useNavigate } from "react-router-dom";
import ProjectDescriptionNav from "./ProjectDescriptionNav";

const AddProject = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const sucessMsg = "Project added sucessfully!";

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProject = (e) => {
    e.preventDefault();
    setLoading(true);
    setShowMessage(false);
    dispatch(dataActions.addProject(name, description)).then(() => {
      setLoading(false);
      setShowMessage(true);
    });
  };

  return (
    <div class="h-screen">
      <div class="sticky top-0">
        <ProjectDescriptionNav />
      </div>

      <div class="flex ml-24 mt-12 ">
        <form
          class="justify-start shadow-md rounded pl-10 pr-24 pt-6 pb-8 w-3/5  bg-white"
          onSubmit={handleAddProject}
        >
          <div>
            <label
              class="block text-gray-700 text-lr font-bold mb-2  mt-5"
              for="projectName"
            >
              Project Name
            </label>
            <input
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              value={name}
              onChange={onChangeName}
            />
          </div>

          <div>
            <label
              class="block text-gray-700 text-lr font-bold mb-2  mt-5"
              for="projectDescription"
            >
              Project Description
            </label>
            <input
              type="text"
              class="shadow whitespace-pre-wrap appearance-none border rounded w-full h-24 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={onChangeDescription}
            />
          </div>

          <div class="flex items-center justify-between pt-10 ">
            <button
              class="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              <span>Add Project</span>
              {loading === true ? (
                <svg
                  class=" bg-blue-500 border-t-white border-2 rounded-full animate-spin h-5 w-5 mr-3  ..."
                  viewBox="0 0 24 24"
                ></svg>
              ) : null}
            </button>
            {showMessage && (
              <div class="mb-3">
                <div class="text-green-500 text-mb italic" role="alert">
                  {sucessMsg}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
