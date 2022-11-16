import React, { useState, useEffect } from "react";
import dataActions from "../actions/dataActions";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginNav from "./LoginNav";
const background = require("../static/register_bg_2.png");

const CompleteDetails = () => {
  const [username, setUsername] = useState("");
  const [googleScholarId, setgoogleScholarId] = useState("");
  const [institute, setInstitute] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeGoogleScholarId = (e) => {
    const googleScholarId = e.target.value;
    setgoogleScholarId(googleScholarId);
  };
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeInstitute = (e) => {
    const institute = e.target.value;
    setInstitute(institute);
  };
  const onChangeBio = (e) => {
    const bio = e.target.value;
    setBio(bio);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      dataActions.completeDetails(username, googleScholarId, bio, institute)
    )
      .then(() => {
        navigate("/home");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <LoginNav transparent />

      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-white-500"
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Please complete your details
                      </h6>
                    </div>

                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Google Scholar Id
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder=""
                          style={{ transition: "all .15s ease" }}
                          onChange={onChangeGoogleScholarId}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder=""
                          style={{ transition: "all .15s ease" }}
                          onChange={onChangeUsername}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Institute
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="The LNM Institute of Information Technology"
                          style={{ transition: "all .15s ease" }}
                          onChange={onChangeInstitute}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Bio
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="(Optional)"
                          style={{ transition: "all .15s ease" }}
                          onChange={onChangeBio}
                        />
                      </div>
                      {/* <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                          onChange={onChangePassword}
                        />
                      </div> */}

                      <div className="text-center mt-6">
                        <Link to="/home">
                          <button
                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                            onClick={handleSubmit}
                          >
                            Get Started!
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompleteDetails;
