import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_END,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_END,
} from "../actions";

const initialState = {
  sidebarOpen: false, // boolean, tells whether the static sidebar component should be rendered
  products: {
    loading: false,
    error: false,
    data: [],
    featuredData: [],
  },
  singleProduct: {
    loading: false,
    error: false,
    data: {},
  },
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchProducts = async (url) => {
    try {
      dispatch({ type: GET_PRODUCTS_BEGIN });
      const response = await axios(url);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR, payload: error.message });
    } finally {
      dispatch({ type: GET_PRODUCTS_END });
    }
  };

  const fetchSingleProduct = async (url, id) => {
    try {
      dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
      const response = await axios(`${url}${id}`);
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR, payload: error.message });
    } finally {
      dispatch({ type: GET_SINGLE_PRODUCT_END });
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
