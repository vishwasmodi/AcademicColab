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
import { signOut } from "firebase/auth";

const Nav = () => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(auth);
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

        <button class=" h-3 w-6 mt-4 ml-4" onClick={handleLogout}>
          <img src={LogoutLogo} />
        </button>
        {user ? (
          <Link to={`/profile/${user.uid}`} class="flex mt-3 ml-4">
            <img class="max-h-8" src={avatar} alt="" />
            <h2 class="mt-1.5 ml-2 text-gray-700 ">{user.displayName}</h2>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Nav;
