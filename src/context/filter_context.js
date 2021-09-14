import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  LOAD_FILTERS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const {
    products: { data },
  } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: data });
    dispatch({ type: LOAD_FILTERS, payload: data });
  }, [data]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [data, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const onProductsFilter = (e) => {
    dispatch({ type: UPDATE_SORT, payload: e.target.value });
  };

  const updateFilters = (e) => {
    const name = e.target.name;
    let value = retrieveValue(e);
    if (e.target.dataset.numeric) {
      value = parseInt(value);
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        onProductsFilter,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

function retrieveValue(userEvent) {
  switch (userEvent.target.type) {
    case "checkbox": {
      return userEvent.target.checked;
    }
    case "button": {
      return userEvent.target.textContent;
    }
    default: {
      return userEvent.target.value;
    }
  }
}

// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
