import axios from "axios";

let API_URL = "/api/";
if (process.env.REACT_APP_ENV === "dev")
  API_URL = process.env.REACT_APP_API_PREFIX + API_URL;
console.log(process.env.REACT_APP_ENV);
const addproject = async (name, description) => {
  console.log("HI", localStorage.getItem("user"));
  return axios.post(
    API_URL + "projects",
    {
      name,
      description,
    },
    {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
      },
    }
  );
};

const getprojects = async () => {
  return axios.get(API_URL + "projects");
};

const joinproject = async (id) => {
  return axios.post(
    API_URL + "colaboratorsReq",
    {
      projectId: id,
    },
    {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
      },
    }
  );
};

const getcolabreqs = async () => {
  return axios.get(API_URL + "colaboratorsReq", {
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
    },
  });
};

const respondtoreq = async (status, reqId) => {
  return axios.post(
    API_URL + "colaboratorsReq/" + reqId.toString(),
    {
      status: status,
    },
    {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
      },
    }
  );
};

const getprofile = async (username) => {
  return axios.get(API_URL + "profile/" + username);
};

export default {
  addproject,
  getprojects,
  joinproject,
  getcolabreqs,
  respondtoreq,
  getprofile,
};
