import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dataActions from "../actions/dataActions";
import ProfileProjectCard from "./ProfileProjectCard";
import ProjectDescriptionNav from "./ProjectDescriptionNav";
import { useParams, Link } from "react-router-dom";
import Loader from "./Loader";

const Profile = (props) => {
  const params = useParams();
  const username = params.username;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(dataActions.getProfile(username)).then(() => {
      setLoading(false);
    });
  }, []);

  const profile = useSelector((state) => state.getprofile.profile);

  return (
    <div>
      <div class="sticky top-0 ">
        <ProjectDescriptionNav />
      </div>
      {loading === true ? (
        <Loader />
      ) : (
        <div>
          <main className="profile-page">
            <section className="relative block" style={{ height: "500px" }}>
              <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                }}
              >
                <span
                  id="blackOverlay"
                  className="w-full h-full absolute opacity-50 bg-black"
                ></span>
              </div>
              <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                style={{ height: "70px" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="text-gray-300 fill-current"
                    points="2560 0 2560 100 0 100"
                  ></polygon>
                </svg>
              </div>
            </section>
            <section className="relative py-16 bg-gray-300">
              <div className="container mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                  <div className="">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-3/12 lg:order-2 flex justify-center">
                        <div>
                          <img
                            alt="..."
                            src={require("../static/vishwas.jpg")}
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                            style={{ maxWidth: "150px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <Link to="/editprofile" class="flex items-stretch">
                          <button
                            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            Edit Profile
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div className="text-center mt-12">
                      <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800">
                        {profile.user.name}
                      </h3>
                      <div className="mb-2 text-gray-700 mt-4">
                        {profile.user.email}
                      </div>
                      <div className="text-sm leading-normal mt-0  text-gray-500 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                        Jaipur, Rajasthan
                      </div>
                      <div className="mb-2 text-gray-700 mt-4">
                        <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                        Assistant Professor
                      </div>
                      <div className="mb-2 text-gray-700">
                        <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                        {profile.user.institute}
                      </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-gray-300 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <p className="mb-4 text-md leading-relaxed text-gray-800">
                            {profile.user.bio}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <div class="">
            <div class="text-3xl flex justify-center mt-12 mb-12">
              {" "}
              Own Projects{" "}
            </div>
            <div class="grid grid-cols-2 grid-flow-row gap-6 justify-self-center content-center items-center ml-12">
              {profile.ownProjects.map((project) => (
                <ProfileProjectCard
                  id={project._id}
                  name={project.name}
                  description={project.description}
                  link={project.githubRepo}
                  userName={project.userName}
                  requests={project.requests}
                  colaboratorsDetails={project.colaboratorsDetails}
                />
              ))}
            </div>
          </div>
          <div class="">
            <div class="text-3xl flex justify-center mt-12 mb-12">
              {" "}
              Colaborated Projects{" "}
            </div>
            <div class="grid grid-cols-2 grid-flow-row gap-6 justify-self-center content-center items-center ml-12">
              {profile.colabProjects.map((project) => (
                <ProfileProjectCard
                  id={project._id}
                  name={project.name}
                  description={project.description}
                  link={project.githubRepo}
                  userName={project.userName}
                  requests={project.requests}
                  colaboratorsDetails={project.colaboratorsDetails}
                />
              ))}
            </div>
          </div>

          <div class="">
            <div class="text-3xl flex justify-center mt-12 mb-12">
              {" "}
              Google Scholar Projects{" "}
            </div>
            <div class="grid grid-cols-2 grid-flow-row gap-6 justify-self-center content-center items-center ml-12">
              {profile.googleScholarProjects.map((project) => (
                <ProfileProjectCard
                  name={project.title}
                  description={project.journal}
                  link={project.url}
                  colaboratorsDetails={[]}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
