import axios from "axios";
import {
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
} from "../types/types";
import { setLoadingUser } from "./setLoading";

//GET USER
export const getUser = () => async (dispatch) => {
  try {
    dispatch(setLoadingUser());
    const { data } = await axios.get("/api/user");
    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      error: error.response.data.message,
    });
  }
};

//DELETE USER
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(setLoadingUser());
    const { data } = await axios.delete(`/api/user/${id}`);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
