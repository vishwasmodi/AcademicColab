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

  const allInterests = [
    { name: "Web Development", checked: false },
    { name: "Android Development", checked: false },
    { name: "Machine Learning", checked: false },
    { name: "Data Science", checked: false },
    { name: "Cyber Security", checked: false },
    { name: "Artificial Intelligence", checked: false },
    { name: "Blockchain", checked: false },
    { name: "Cloud Computing", checked: false },
    { name: "Internet of Things", checked: false },
    { name: "Game Development", checked: false },
  ];
  // const interests1 = [
  //   "Web Development",
  //   "Android Development",
  //   "AI",
  //   "ML",
  //   "NLP",
  //   "Computer Vision",
  //   "Data Science",
  //   "Blockchain",
  //   "Cyber Security",
  //   "Cloud Computing",
  //   "Internet of Things",
  //   "Embedded Systems",
  //   "Robotics",
  //   "Quantum Computing",
  //   "Game Development",
  //   "UI/UX",
  // ];

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
    const interests = allInterests.filter((interest) => interest.checked);
    console.log(interests);
    setLoading(true);
    dispatch(
      dataActions.completeDetails(
        username,
        googleScholarId,
        bio,
        institute,
        interests
      )
    )
      .then(() => {
        navigate("/home");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    console.log(e.target);
    console.log(name, checked);
    allInterests.forEach((interest) => {
      if (interest.name === name) {
        interest.checked = checked;
      }
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
            <div className="flex items-center justify-center h-full">
              <div className="w-full lg:w-9/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Please complete your details
                      </h6>
                    </div>

                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div class="flex flex-row">
                    <div className="flex-auto px-4 max-w-md lg:px-10 py-10 pt-0">
                      <form>
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
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
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
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
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
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
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
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

                    <div>
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Interests
                      </label>
                      {allInterests.map((interest) => (
                        <div class="flex justify-left">
                          <div>
                            <div class="form-check">
                              <input
                                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                type="checkbox"
                                value=""
                                onClick={handleCheckbox}
                                name={interest.name}
                              />
                              <label
                                class="form-check-label font-semibold text-gray-700 inline-block text-xs"
                                for="flexCheckDefault"
                              >
                                {interest.name}
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
