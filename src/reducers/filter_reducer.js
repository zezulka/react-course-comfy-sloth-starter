import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  LOAD_FILTERS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

import {
  SORT_BY_NAME_ASC,
  SORT_BY_NAME_DESC,
  SORT_BY_PRICE_HI,
  SORT_BY_PRICE_LOW,
} from "../utils/sort_actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
      };
    }
    case LOAD_FILTERS: {
      const maxPrice = Math.max.apply(
        Math,
        action.payload.map((p) => p.price)
      );
      return {
        ...state,
        filters: {
          ...state.filters,
          maxPrice,
          price: maxPrice,
        },
      };
    }
    case SET_LISTVIEW: {
      return {
        ...state,
        gridView: false,
      };
    }
    case SET_GRIDVIEW: {
      return {
        ...state,
        gridView: true,
      };
    }
    case UPDATE_SORT: {
      return {
        ...state,
        sort: action.payload,
      };
    }
    case FILTER_PRODUCTS: {
      let filteredProducts = [...state.allProducts];

      const { text, company, category, color, maxPrice, price, shipping } =
        state.filters;

      if (text) {
        filteredProducts = filteredProducts.filter((p) =>
          p.name.includes(text)
        );
      }

      if (company !== "all") {
        filteredProducts = filteredProducts.filter(
          (p) => p.company === company
        );
      }

      if (category !== "all") {
        filteredProducts = filteredProducts.filter(
          (p) => p.category === category
        );
      }

      if (color !== "all") {
        filteredProducts = filteredProducts.filter((p) =>
          p.colors.includes(color)
        );
      }

      if (price < maxPrice) {
        filteredProducts = filteredProducts.filter((p) => p.price <= price);
      }

      if (shipping) {
        filteredProducts = filteredProducts.filter((p) => p.shipping);
      }

      return {
        ...state,
        filteredProducts,
      };
    }
    case SORT_PRODUCTS: {
      return {
        ...state,
        filteredProducts: sortProducts(state.sort, state.filteredProducts),
      };
    }
    case UPDATE_FILTERS: {
      const { name, value } = action.payload;
      return {
        ...state,
        filters: { ...state.filters, [name]: value },
      };
    }
    case CLEAR_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.maxPrice,
          shipping: false,
        },
      };
    }
    default: {
      throw new Error(`No Matching "${action.type}" - action type`);
    }
  }
};

function sortProducts(criterion, data) {
  switch (criterion) {
    case SORT_BY_NAME_ASC: {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    }
    case SORT_BY_NAME_DESC: {
      return data.sort((a, b) => b.name.localeCompare(a.name));
    }
    case SORT_BY_PRICE_HI: {
      return data.sort((a, b) => b.price - a.price);
    }
    case SORT_BY_PRICE_LOW: {
      return data.sort((a, b) => a.price - b.price);
    }
    default: {
      throw new Error(
        `The specified sort criterion ${criterion} is not supported.`
      );
    }
  }
}

export default filter_reducer;
