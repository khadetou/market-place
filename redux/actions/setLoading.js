import { SET_LOADING_BOUTIQUE, SET_LOADING_USER } from "../types/types";

export const setLoadingUser = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_USER,
  });
};
export const setLoadingBoutique = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_BOUTIQUE,
  });
};
