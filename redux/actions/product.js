import axios from "axios";
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  GET_SELLER_PRODUCTS_FAIL,
  GET_SELLER_PRODUCTS_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
} from "../types/types";
import { setLoadingProduct } from "./setLoading";

export const createProduct = (dataProduct) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

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

//GET SELLER PRODUCTS
export const getSellerProduct = () => async (dispatch) => {
  try {
    dispatch(setLoadingProduct());
    const { data } = await axios.get("/api/product");
    dispatch({
      type: GET_SELLER_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//GET  PRODUCTS BY CATEGORY
export const getProductByCategory = (category) => async (dispatch) => {
  try {
    dispatch(setLoadingProduct());
    const { data } = await axios.get(
      `/api/product/category?category=${category}`
    );
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//UPDATE PRODUCT
export const updateProduct = (dataProduct, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/product/${id}`, dataProduct, config);
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
