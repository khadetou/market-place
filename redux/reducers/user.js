import {
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  SET_LOADING_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
} from "../types/types";

const initialState = {
  user: null,
  users: null,
  message: null,
  error: null,
  loading: false,
};

export const User = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        message: payload,
        loading: false,
      };

    case GET_USERS_FAIL:
    case GET_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        message: null,
      };
    case SET_LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};
