import {
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  SET_LOADING_PRODUCT,
} from "../types/types";

const initialState = {
  products: null,
  product: null,
  message: null,
  error: null,
  loading: null,
};

export const Products = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: payload,
        loading: false,
      };

    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case SET_LOADING_PRODUCT:
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
