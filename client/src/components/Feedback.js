import React, { useState } from "react";
import * as emailjs from "emailjs-com";
// emailjs.init("vishwasmodi");

const Feedback = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const templateParams = {
      user_name: `${firstName} ${lastName}`,
      user_email: email,
      message: message,
      user_title: "Feedback",
    };

    emailjs
      .send(
        "default_service",
        "template_n973evc",
        templateParams,
        "user_enEL1WHNa2VmN2nRAyrTi"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          setFirstName("");
          setLastName("");
          setEmail("");
          setMessage("");
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <div class="flex justify-center align-middle mt-10 ">
      <form class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              First Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p class="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Last Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              E-mail
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p class="text-gray-600 text-xs italic">
              Some tips - as long as needed
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Message
            </label>
            <textarea
              class=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              id="message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <p class="text-gray-600 text-xs italic">
              Re-size can be disabled by set by resize-none / resize-y /
              resize-x / resize
            </p>
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3">
            <button
              class="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
          <div class="md:w-2/3"></div>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
