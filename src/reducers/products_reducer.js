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

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN: {
      return { ...state, sidebarOpen: true };
    }
    case SIDEBAR_CLOSE: {
      return { ...state, sidebarOpen: false };
    }
    case GET_PRODUCTS_BEGIN: {
      return { ...state, products: { ...state.products, loading: true } };
    }
    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: {
          ...state.products,
          featuredData: action.payload.filter((i) => i.featured).slice(0, 3),
          data: action.payload,
        },
      };
    }
    case GET_PRODUCTS_ERROR: {
      return {
        ...state,
        products: {
          ...state.products,
          error: true,
        },
      };
    }
    case GET_PRODUCTS_END: {
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
        },
      };
    }
    case GET_SINGLE_PRODUCT_BEGIN: {
      return {
        ...state,
        singleProduct: {
          ...state.singleProduct,
          loading: true,
          error: false,
        },
      };
    }
    case GET_SINGLE_PRODUCT_ERROR: {
      return {
        ...state,
        singleProduct: {
          ...state.singleProduct,
          error: true,
        },
      };
    }
    case GET_SINGLE_PRODUCT_SUCCESS: {
      return {
        ...state,
        singleProduct: {
          ...state.singleProduct,
          data: action.payload,
        },
      };
    }
    case GET_SINGLE_PRODUCT_END: {
      return {
        ...state,
        singleProduct: {
          ...state.singleProduct,
          loading: false,
        },
      };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default products_reducer;
