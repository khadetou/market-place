import axios from "axios";
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_SUCCESS } from "../types/types";
import { setLoadingProduct } from "./setLoading";

export const createProduct = (dataProduct) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(dataProduct);
    dispatch(setLoadingProduct());
    const { data } = await axios.post("/api/product", dataProduct, config);
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
