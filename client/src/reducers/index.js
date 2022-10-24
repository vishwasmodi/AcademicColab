import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import {
  getprojects,
  getproject,
  addproject,
  joinproject,
  getcolabreqs,
  getprofile,
  addComment,
} from "./data";

export default combineReducers({
  auth,
  message,
  getprojects,
  getproject,
  addproject,
  joinproject,
  getcolabreqs,
  getprofile,
  addComment,
});
