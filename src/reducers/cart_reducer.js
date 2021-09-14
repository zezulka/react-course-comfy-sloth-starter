import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, color, amount, product } = action.payload;
      if (state.cart.find((i) => i.id === color)) {
        const newCart = state.cart.map((i) => {
          if (id + color === i.id) {
            const newAmount = Math.min(i.amount + amount, i.max);
            return { ...i, newAmount };
          }
          return i;
        });
        return { ...state, newCart };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color: color,
          amount: amount,
          image: product.images[0],
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }
    case CLEAR_CART: {
      return { ...state, cart: [] };
    }
    case REMOVE_CART_ITEM: {
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload),
      };
    }
    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      const newCart = state.cart.map((c) => {
        console.log(id, c.id);
        if (c.id === id) {
          console.log(value(c.amount));
          return {
            ...c,
            amount: value(c.amount),
          };
        }
        return c;
      });
      return {
        ...state,
        cart: newCart,
      };
    }
    case COUNT_CART_TOTALS: {
      const { totalItems, totalAmount } = state.cart.reduce(
        (acc, i) => {
          return {
            totalItems: acc.totalItems + i.amount,
            totalAmount: acc.totalAmount + i.amount * i.price,
          };
        },
        { totalItems: 0, totalAmount: 0 }
      );
      return {
        ...state,
        totalItems,
        totalAmount,
      };
    }
    default: {
      throw new Error(`No Matching "${action.type}" - action type`);
    }
  }
};

export default cart_reducer;
