import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dataActions from "../actions/dataActions";

const Sidebar = () => {
  let allInterests = [
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
  const [interests, setInterests] = useState([]);
  const dispatch = useDispatch();

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setInterests([...interests, name]);
    } else {
      setInterests(interests.filter((interest) => interest !== name));
    }
  };

  useEffect(() => {
    dispatch(dataActions.filterProjects(interests));
  }, [interests]);

  return (
    <div class=" h-[90vh] mr-4 sticky top-16">
      <div class="bg-white rounded-xl ml-4 pr-8 mt-4 h-full shadow-lg text-black w-auto">
        <div class="ml-10 text-sm">
          <div class="mb-2 pt-4 block uppercase text-gray-700 text-xs font-bold">
            Fields
          </div>
          <div>
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
