import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../static/avatar.png";
import dataActions from "../actions/dataActions";
import ProfileProjectCard from "./ProfileProjectCard";
import cclogo from "../static/cclogo.png";
import cflogo from "../static/cflogo.png";
import ReactLoading from "react-loading";

const Profile = (username) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataActions.getProfile(username.username))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);
  const profile = useSelector((state) => state.getprofile.profile);
  return (
    <div>
      <div class=" h-64 bg-gradient-to-r from-sky-500 to-indigo-500"></div>

      {!loading ? (
        <div class="">
          <div class=" top-28 left-20 absolute flex flex-row ">
            <img class="top-6 left-10 absolute h-60 " src={dp} alt="" />
            <div class=" h-80 w-80 rounded-full border-r-4 border-slate-500 shadow-xl"></div>
            <div class="text-4xl font-bold ml-20 mt-24">
              {profile.user.name}
            </div>
            <div class="text-2xl mt-24">
              &nbsp;&nbsp;&nbsp;({profile.user.username})
              <div class="mt-6 text-lg">Email: &nbsp;{profile.user.email}</div>
            </div>
          </div>

          <div class="flex justify-center space-x-24  font-semibold  font-mono mt-40">
            <div class="bg-purple-100 flex flex-column rounded overflow-hidden shadow-lg pb-4 mb-4 px-12 py-8 w-96  opacity-90 hover:scale-105">
              <div>
                <img class="w-18 h-8 mb-4" src={cflogo} />
                <div class="h-1 bg-purple-400 mb-4"></div>

                <div class="flex font-bold text-xl mb-2">
                  Username:
                  <a
                    href={`https://codeforces.com/profile/${profile.user.username} `}
                    target="_blank"
                  >
                    <div class="text-blue-400">
                      &nbsp;&nbsp;{profile.codeforces.username}
                    </div>
                  </a>
                </div>

                <div class="text-l">
                  Current Rating: {profile.codeforces.curRating}
                </div>
                <div class="text-l">
                  Max Rating: {profile.codeforces.maxRating}
                </div>
                <div class="text-l">Rank: {profile.codeforces.rank}</div>
                <div class="text-l">
                  Problems Solved:
                  {profile.codeforces.submissions}
                </div>
              </div>
            </div>

            <div class="bg-purple-100 flex flex-column rounded overflow-hidden shadow-lg pb-4 mb-4 px-12 py-8  w-96 opacity-90 hover:scale-105">
              <div>
                <img class="w-76 h-8 mb-4" src={cclogo} />
                <div class="h-1 bg-purple-400  mb-4"></div>
                {/* <div class="text-xl bold">Codeforces Stats: </div> */}

                <div class="flex font-bold text-xl mb-2">
                  Username:
                  <a
                    href={`https://www.codechef.com/users/${profile.user.username} `}
                    target="_blank"
                  >
                    <div class="text-blue-400">
                      &nbsp;&nbsp;{profile.codechef.username}
                    </div>
                  </a>
                </div>

                <div class="text-l">
                  Current Rating:&nbsp;&nbsp; {profile.codechef.curRating}
                </div>
                <div class="text-l">
                  Max Rating:&nbsp;&nbsp; {profile.codechef.maxRating}
                  &nbsp;(&nbsp;
                  {profile.codechef.stars}&nbsp;)
                </div>
                <div class="text-l">
                  Global Rank:&nbsp;&nbsp; {profile.codechef.globalRank}
                </div>
                <div class="text-l">
                  Country Rank: &nbsp;&nbsp;{profile.codechef.countryRank}
                </div>
                <div class="text-l">
                  Problems Solved:&nbsp;&nbsp;
                  {profile.codechef.solved}
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="text-5xl flex justify-center mt-12 mb-12">
              {" "}
              Own Projects{" "}
            </div>
            <div class="grid grid-cols-2 grid-flow-row gap-6 justify-self-center content-center items-center ml-12">
              {profile.ownProjects.map((project) => (
                <ProfileProjectCard
                  id={project._id}
                  name={project.name}
                  description={project.description}
                  githubRepo={project.githubRepo}
                  techStack={project.techStack}
                  colaborators={project.colaborators}
                  votes={project.votes}
                  colaboratorsLimit={project.colaboratorsLimit}
                  user={project.user}
                  userName={project.userName}
                  requests={project.requests}
                  colaboratorUsername={project.colaboratorsUsername}
                />
              ))}
            </div>
          </div>
          <div class="">
            <div class="text-5xl flex justify-center mt-12 mb-12">
              {" "}
              Colaborated Projects{" "}
            </div>
            <div class="grid grid-cols-2 grid-flow-row gap-6 justify-self-center content-center items-center ml-12">
              {profile.colabProjects.map((project) => (
                <ProfileProjectCard
                  id={project._id}
                  name={project.name}
                  description={project.description}
                  githubRepo={project.githubRepo}
                  techStack={project.techStack}
                  colaborators={project.colaborators}
                  votes={project.votes}
                  colaboratorsLimit={project.colaboratorsLimit}
                  user={project.user}
                  userName={project.userName}
                  requests={project.requests}
                  colaboratorUsername={project.colaboratorsUsername}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            class="flex flex-wrap content-center justify-center w-100 h-100 flex-col"
            key="spinningBubbles"
          >
            <ReactLoading type="spinningBubbles" color="#0000FF" />
            <h3 class="mt-6">Loading...</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
