import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import {
  getprojects,
  addproject,
  joinproject,
  getcolabreqs,
  getprofile,
} from "./data";

export default combineReducers({
  auth,
  message,
  getprojects,
  addproject,
  joinproject,
  getcolabreqs,
  getprofile,
});
