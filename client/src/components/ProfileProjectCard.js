import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dataActions from "../actions/dataActions";

const ProjectCard = ({
  id,
  name,
  description,
  link,
  userName,
  requests,
  colaboratorsDetails,
}) => {
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(null);
  const dispatch = useDispatch();

  const handleJoinProject = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(dataActions.joinProject(id)).then(setLoading(false));
    setRequested(true);
  };

  return (
    <div class="rounded overflow-hidden shadow-lg pb-4 mb-4 bg-[rgb(255,255,255)] mx-8">
      <div class="px-6 py-4">
        <div class="text-[rgb(26,14,171)] text-xl">
          <Link to={`/projects/${id}`}>{name}</Link>
        </div>
        <div>
          {colaboratorsDetails.map((colaborator) => {
            return (
              <div class="text-[rgb(119,119,119)] text-sm">
                <Link to={`/profile/${colaborator.username}`}>
                  {colaborator.name},&nbsp;&nbsp;
                </Link>
              </div>
            );
          })}
        </div>
        <p class="text-[rgb(119,119,119)] text-sm">{description}</p>
      </div>
      <div class="flex justify-between">
        <div class="text-gray-700 mt-3 text-sm mx-6">
          Link:
          <Link to={`${link}`}> {link}</Link>{" "}
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
