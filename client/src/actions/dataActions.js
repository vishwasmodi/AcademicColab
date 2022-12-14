import * as actions from "./types";
import DataServices from "../services/data.service";

const addProject = (name, description, interests) => (dispatch) => {
  return DataServices.addproject(name, description, interests).then(
    (response) => {
      const message = "Success!";
      dispatch({
        type: actions.ADD_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: actions.SET_MESSAGE,
        payload: message,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const getProjects = () => (dispatch) => {
  return DataServices.getprojects().then(
    (response) => {
      dispatch({
        type: actions.GET_PROJECTS_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const searchText = (searchText) => (dispatch) => {
  return DataServices.searchText(searchText).then(
    (response) => {
      dispatch({
        type: actions.GET_PROJECTS_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const filterProjects = (interests) => (dispatch) => {
  return DataServices.filterProjects(interests).then(
    (response) => {
      dispatch({
        type: actions.GET_PROJECTS_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const getProject = (id) => (dispatch) => {
  return DataServices.getproject(id).then(
    (response) => {
      dispatch({
        type: actions.GET_PROJECT_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const joinProject = (id) => (dispatch) => {
  return DataServices.joinproject(id).then(
    (response) => {
      dispatch({
        type: actions.JOIN_REQ_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: actions.SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const getColabReqs = () => (dispatch) => {
  return DataServices.getcolabreqs().then(
    (response) => {
      console.log(response);
      dispatch({
        type: actions.GET_COLAB_REQ_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const respondToReq = (status, reqId) => (dispatch) => {
  return DataServices.respondtoreq(status, reqId).then(
    (response) => {
      dispatch({
        type: actions.RESPOND_C_REQ_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: actions.SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const getProfile = (userId) => (dispatch) => {
  return DataServices.getprofile(userId).then(
    (response) => {
      dispatch({
        type: actions.GET_PROFILE_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const addComment = (comment, projectId) => (dispatch) => {
  return DataServices.addComment(comment, projectId).then(
    (response) => {
      dispatch({
        type: actions.ADD_COMMENT_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const completeDetailsStatus = () => (dispatch) => {
  return DataServices.completeDetailsStatus().then(
    (response) => {
      dispatch({
        type: actions.COMPLETE_DETAILS_STATUS_SUCCESS,
        payload: response.data,
      });
      Promise.resolve();
      return response.data.completeDetailsStatus;
    },
    (error) => {
      console.log(error);
    }
  );
};

const completeDetails =
  (username, googleScholarId, bio, institute, interests) => (dispatch) => {
    return DataServices.completeDetails(
      username,
      googleScholarId,
      bio,
      institute,
      interests
    ).then(
      (response) => {
        dispatch({
          type: actions.COMPLETE_DETAILS_SUCCESS,
          payload: response.data,
        });
        return Promise.resolve();
      },
      (error) => {
        console.log(error);
      }
    );
  };

export default {
  addProject,
  getProjects,
  searchText,
  filterProjects,
  getProject,
  joinProject,
  getColabReqs,
  respondToReq,
  getProfile,
  addComment,
  completeDetailsStatus,
  completeDetails,
};
