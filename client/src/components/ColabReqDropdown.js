import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dataActions from "../actions/dataActions";

const ColabReqDropdown = () => {
  const [colabDropdown, setColabDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const requests = useSelector((state) => state.getcolabreqs.colabReqs);

  const setShowColabDropdown = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!colabDropdown)
      dispatch(dataActions.getColabReqs()).then(setLoading(false));
    setColabDropdown(!colabDropdown);
  };
  const handleReq = (e, rId) => {
    e.preventDefault();
    setLoading(true);
    dispatch(dataActions.respondToReq(e.target.innerText, rId));
  };
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={setShowColabDropdown}
        class="bg-gray-500 hover:bg-gray-800 text-white font-bold px-2 py-2 rounded-full focus:outline-none focus:shadow-outline ml-6"
      >
        <span class="absolute h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 ml-16 "></span>
        </span>
        Requests
      </button>

      {colabDropdown ? (
        <div class="z-10 absolute overflow-hidden">
          {requests.map((request) => {
            return (
              <div class="rounded shadow-lg pb-4 px-2 mb-2 w-72 bg-blue-100 opacity-90 hover:scale-105">
                <h1>{request.senderName}</h1>
                <h2>{request.projectName}</h2>
                <button
                  onClick={(e) => handleReq(e, request._id)}
                  class="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-1 rounded focus:outline-none focus:shadow-outline ml-6"
                >
                  Accept
                </button>
                <button
                  onClick={(e) => handleReq(e, request._id)}
                  class="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-1 rounded focus:outline-none focus:shadow-outline ml-6"
                >
                  Deny
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ColabReqDropdown;
