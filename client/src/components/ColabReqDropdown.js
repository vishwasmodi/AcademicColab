import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dataActions from "../actions/dataActions";
import Connections from "../static/connections.png";

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
      <button class=" h-14 w-10 ml-2" onClick={setShowColabDropdown}>
        <img src={Connections} />
      </button>

      {colabDropdown ? (
        <div class="fixed top-14 right-10 overflow-auto">
          {requests.map((request) => {
            return (
              <div class="rounded shadow-lg pb-4 px-2 mb-2 w-72 bg-[rgb(245,245,245)] opacity-90 hover:scale-105">
                <h1>{request.senderName}</h1>
                <h2>{request.projectName}</h2>
                <button
                  onClick={(e) => handleReq(e, request._id)}
                  class="bg-[rgb(26,115,227)] text-white font-semibold px-4 py-1 rounded focus:outline-none focus:shadow-outline ml-6"
                >
                  Confirm
                </button>
                <button
                  onClick={(e) => handleReq(e, request._id)}
                  class="bg-[rgb(227,230,234)] hover:bg-[rgb(202,203,204)] text-black font-semibold px-4 py-1 rounded focus:outline-none focus:shadow-outline ml-6"
                >
                  Delete
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
