import * as actions from "../actions/types";

const initialStateGet = {
  projects: [],
  loading: false,
};

const initialProject = {
  project: {},
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
  profile: {
    user: {
      username: "",
      name: "",
      email: "",
      googleScholarId: "",
    },
    ownProjects: [],
    colabProjects: [],
    googleScholarProjects: [],
  },
  loading: false,
};

const initialComment = {
  newComment: {},
};

const completeDetailsGet = {
  completeDetailsStatus: false,
};

const completeDetailsPost = {
  details: {},
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

export function getproject(state = initialProject, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_PROJECT_SUCCESS:
      return {
        ...state,
        project: payload,
        loading: false,
      };
    case actions.GET_PROJECT_FAIL:
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
        loading: false,
      };
    case actions.GET_PROFILE_FAIL:
      return state;
    default:
      return state;
  }
}

export function addComment(state = initialComment, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        newComment: payload,
      };
    default:
      return state;
  }
}

export function completeDetailsStatus(state = completeDetailsGet, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.COMPLETE_DETAILS_STATUS_SUCCESS:
      return {
        ...state,
        completeDetailsStatus: payload,
      };
    default:
      return state;
  }
}

export function completeDetails(state = completeDetailsPost, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.COMPLETE_DETAILS_SUCCESS:
      return {
        ...state,
        details: payload,
        loading: false,
      };
    default:
      return state;
  }
}
