import {
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  CREATE_STORE_FAIL,
  CREATE_STORE_SUCCESS,
  SET_LOADING_BOUTIQUE,
} from "../types/types";

const initialState = {
  boutique: null,
  boutiques: null,
  message: null,
  error: null,
  loading: null,
};

export const Boutiques = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case CREATE_STORE_SUCCESS:
      return {
        ...state,
        boutique: payload,
        loading: false,
      };

    case CREATE_STORE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case SET_LOADING_BOUTIQUE:
      return {
        ...state,
        loading: true,
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
    default:
      return {
        ...state,
      };
  }
};
