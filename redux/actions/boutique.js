import axios from "axios";
import { CREATE_STORE_FAIL, CREATE_STORE_SUCCESS } from "../types/types";
import { setLoadingBoutique } from "./setLoading";

export const createStore = (dataStore) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch(setLoadingBoutique());
    const { data } = await axios.post("/api/store", dataStore, config);
    dispatch({
      type: CREATE_STORE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: CREATE_STORE_FAIL,
      payload: error.response.data.message,
    });
  }
};
