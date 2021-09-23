import axios from "axios";
import {
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
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
      payload: error.response.data.message,
    });
  }
};

//GET ALL USERS
export const getAllUser = () => async (dispatch) => {
  try {
    dispatch(setLoadingUser());
    const { data } = await axios.get("/api/admin/user");
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: error.response.data.message,
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
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//DELETE USER By ADMIN
export const deleteUserByAdmin = (id) => async (dispatch) => {
  try {
    dispatch(setLoadingUser());
    const { data } = await axios.delete(`/api/admin/user/${id}`);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
