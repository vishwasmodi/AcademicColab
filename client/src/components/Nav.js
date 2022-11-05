import React, { useState } from "react";
import Search from "./Search";
import ColabReqDropdown from "./ColabReqDropdown";
import logo from "../static/pcLogo.png";
import avatar from "../static/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { auth, logoutFirebase } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import LogoutLogo from "../static/logout.svg";
const Nav = () => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutFirebase();
    dispatch(logout()).then(() => {
      navigate("/");
    });
  };

  return (
    <div class="h-[48px] bg-[rgb(255,255,255)] flex items-center justify-between drop-shadow-md">
      <div class=" ml-8">
        <Link to="/home">
          <div class="font-mono font-bold text-xl">Colab</div>
          {/* <img src={logo} class="h-14" alt="" /> */}
        </Link>
      </div>
      <Search />
      <div class="flex  flex-row mr-10">
        <ColabReqDropdown />
        {/* <Link to={`/profile/${user.username}`} class="flex">
            <img class="max-h-10 ml-20" src={avatar} alt="" />
            <h2 class="flex text-lg ml-2 mr-4 mt-2 text-white">{user.name}</h2>
          </Link> */}
        <button class=" h-5 w-6 mt-3 ml-4" onClick={handleLogout}>
          <img src={LogoutLogo} />
        </button>
      </div>
    </div>
  );
};

export default Nav;
