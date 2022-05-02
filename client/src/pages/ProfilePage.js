import React from "react";
import { useParams } from "react-router-dom";
import Profile from "../components/Profile";

const ProfilePage = (props) => {
  const params = useParams();
  return (
    <div>
      <Profile username={params.username} />
    </div>
  );
};

export default ProfilePage;
