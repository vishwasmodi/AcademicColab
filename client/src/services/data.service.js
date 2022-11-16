import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";

let API_URL = "/api/";
if (process.env.REACT_APP_ENV === "dev")
  API_URL = process.env.REACT_APP_API_PREFIX + API_URL;

const addproject = async (name, description) => {
  return axios.post(
    API_URL + "projects",
    {
      name,
      description,
    },
    {
      headers: {
        "x-auth-token": localStorage.getItem("user"),
      },
    }
  );
};

const getprojects = async () => {
  return axios.get(API_URL + "projects", {
    headers: {
      "x-auth-token": localStorage.getItem("user"),
    },
  });
};

const getproject = async (id) => {
  return axios.get(API_URL + "projects/" + id);
};

const joinproject = async (id) => {
  return axios.post(
    API_URL + "colaboratorsReq",
    {
      projectId: id,
    },
    {
      headers: {
        "x-auth-token": localStorage.getItem("user"),
      },
    }
  );
};

const getcolabreqs = async () => {
  return axios.get(API_URL + "colaboratorsReq", {
    headers: {
      "x-auth-token": localStorage.getItem("user"),
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
        "x-auth-token": localStorage.getItem("user"),
      },
    }
  );
};

const getprofile = async (userId) => {
  return axios.get(API_URL + "profile/" + userId);
};

const addComment = async (comment, projectId) => {
  return axios.post(
    API_URL + "projects/comments/" + projectId,
    {
      comment: comment,
    },
    {
      headers: {
        "x-auth-token": localStorage.getItem("user"),
      },
    }
  );
};

const completeDetailsStatus = async () => {
  const res = await axios.get(API_URL + "users/completeDetails", {
    headers: {
      "x-auth-token": localStorage.getItem("user"),
    },
  });
  return res;
};

const completeDetails = async (username, googleScholarId, bio, institute) => {
  return axios.post(
    API_URL + "users/completeDetails",
    {
      username,
      googleScholarId,
      bio,
      institute,
    },
    {
      headers: {
        "x-auth-token": localStorage.getItem("user"),
      },
    }
  );
};

const searchText = async (searchText) => {
  return axios.get(API_URL + "projects/search/" + searchText);
};

export default {
  addproject,
  getprojects,
  getproject,
  joinproject,
  getcolabreqs,
  respondtoreq,
  getprofile,
  addComment,
  completeDetailsStatus,
  completeDetails,
  searchText,
};
