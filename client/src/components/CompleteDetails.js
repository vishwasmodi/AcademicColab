import React, { useState, useEffect } from "react";
import { completedetails } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const CompleteDetails = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(completedetails(username))
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1> Complete Details</h1>
      <div class="flex justify-center">
        <form
          class="flex flex-col justify-center bg-white shadow-md rounded  px-8 py-10 mt-28 w-96 "
          onSubmit={handleSubmit}
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteDetails;
