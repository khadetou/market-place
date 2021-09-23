import axios from "axios";
import { CREATE_STORE_FAIL, CREATE_STORE_SUCCESS } from "../types/types";

export const createStore = (dataStore) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/store", dataStore, config);
    dispatch({
      type: CREATE_STORE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_STORE_FAIL,
      payload: error.response.data.message,
    });
  }
};
