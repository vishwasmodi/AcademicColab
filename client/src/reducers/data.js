import * as actions from "../actions/types";

const initialStateGet = {
  projects: [],
  loading: false,
};

const initialStateAdd = {
  newProject: {},
  loading: false,
};

const initialStateSendReq = {
  newRequest: {},
  loading: false,
};

const intitalColabReqs = {
  colabReqs: [],
  loading: false,
};

const initialProfile = {
  profile: {},
  loading: false,
};

export function addproject(state = initialStateAdd, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_SUCCESS:
      return {
        ...state,
        newProject: payload,
        loading: false,
      };
    case actions.ADD_FAIL:
      return state;
    default:
      return state;
  }
}

export function getprojects(state = initialStateGet, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: payload,
        loading: false,
      };
    case actions.GET_PROJECTS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export function joinproject(state = initialStateSendReq, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.JOIN_REQ_SUCCESS:
      return {
        ...state,
        newRequest: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export function getcolabreqs(state = intitalColabReqs, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_COLAB_REQ_SUCCESS:
      return {
        ...state,
        colabReqs: payload,
        loading: false,
      };
    case actions.RESPOND_C_REQ_SUCCESS:
      return {
        ...state,
        colabReqs: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export function getprofile(state = initialProfile, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
      };
    default:
      return state;
  }
}
