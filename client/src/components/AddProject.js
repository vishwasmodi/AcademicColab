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
  const allInterests = [
    { name: "Web Development", checked: false },
    { name: "Android Development", checked: false },
    { name: "Machine Learning", checked: false },
    { name: "Data Science", checked: false },
    { name: "Cyber Security", checked: false },
    { name: "Artificial Intelligence", checked: false },
    { name: "Blockchain", checked: false },
    { name: "Cloud Computing", checked: false },
    { name: "Internet of Things", checked: false },
    { name: "Game Development", checked: false },
  ];

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
    const interests = allInterests.filter((interest) => interest.checked);
    dispatch(dataActions.addProject(name, description, interests)).then(() => {
      setLoading(false);
      setShowMessage(true);
    });
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    console.log(e.target);
    console.log(name, checked);
    allInterests.forEach((interest) => {
      if (interest.name === name) {
        interest.checked = checked;
      }
    });
  };

  return (
    <div class="h-screen">
      <div class="sticky top-0">
        <ProjectDescriptionNav />
      </div>

      <div class="flex ml-24 mt-12 ">
        <form
          class="justify-start shadow-md rounded pl-10 pr-24 pt-6 pb-8 bg-white flex flex-row w-3/4"
          onSubmit={handleAddProject}
        >
          <div class="w-2/3">
            <div>
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-2"
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
                class="block uppercase text-gray-700 text-xs font-bold mb-2 mt-6"
                for="projectDescription"
              >
                Project Description
              </label>
              <input
                type="text"
                class="shadow border rounded w-full h-40 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline break-words"
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
          </div>

          <div class="ml-10">
            <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
              Fields
            </label>
            {allInterests.map((interest) => (
              <div class="flex justify-left">
                <div>
                  <div class="form-check">
                    <input
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="checkbox"
                      value=""
                      onClick={handleCheckbox}
                      name={interest.name}
                    />
                    <label
                      class="form-check-label font-semibold text-gray-700 inline-block text-xs"
                      for="flexCheckDefault"
                    >
                      {interest.name}
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
