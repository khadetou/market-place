import { SET_LOADING_USER } from "../types/types";

export const setLoadingUser = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_USER,
  });
};
