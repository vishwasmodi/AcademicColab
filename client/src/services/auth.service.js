import axios from "axios";

let API_URL = "/api/";
if (process.env.REACT_APP_ENV === "dev")
  API_URL = process.env.REACT_APP_API_PREFIX + API_URL;

const register = async (name, username, email, password, googleScholarId) => {
  return axios
    .post(API_URL + "users/signup", {
      name,
      username,
      email,
      password,
      googleScholarId,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const login = async (username, password) => {
  return axios
    .post(API_URL + "users/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const completedetails = async (username) => {
  return axios
    .post(API_URL + "completedetails", {
      username,
    })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  // localStorage.removeItem("currentUser");
};

export default {
  register,
  login,
  logout,
};
