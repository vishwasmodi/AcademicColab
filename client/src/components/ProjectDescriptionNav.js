import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../static/arrow.png";

const ProjectDescriptionNav = () => {
  return (
    <div class="h-[48px] bg-[rgb(245,245,245)] flex items-center justify-between drop-shadow-md">
      <div class=" ml-8">
        <Link to="/home" class="flex">
          <img src={Arrow} class="h-4 w-4 mt-1 mr-4 opacity-50" alt="" />
          <div class="opacity-60">View article</div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectDescriptionNav;
