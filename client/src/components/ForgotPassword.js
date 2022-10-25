import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../config/firebase-config";
import LoginNav from "./LoginNav";
import background from "../static/register_bg_2.png";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

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
          <div className="container mx-auto px-4 h-full ">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 ">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                  <div className="flex-auto px-4 lg:px-10 ">
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2 mt-12"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                          onChange={onChangeEmail}
                        />
                      </div>

                      <div className="text-center mt-10">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={() => sendPasswordReset(email)}
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="flex mb-4 justify-end mt-6 mr-10">
                    <div className="">
                      <small>
                        Remember password? &nbsp;&nbsp;
                        <Link to="/">Log In</Link>
                      </small>
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
}
export default Reset;
