import { actionTypes } from "./actionTypes";

export const initialState = {
  loading: false,
  products: [],
  error: false,
  cart: [],
  wishlist: [],
};

export const productReducer = (state, action) => {
  //   console.log(action);
  switch (action.type) {
    case actionTypes.FETCHING_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.FETCHING_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: false,
      };
    case actionTypes.FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case actionTypes.ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: [
          ...state.cart.filter(
            (product) => state.cart.indexOf(product) != action.payload
          ),
        ],
      };
    case actionTypes.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: [
          ...state.wishlist.filter(
            (product) => state.wishlist.indexOf(product) != action.payload
          ),
        ],
      };
    default:
      return state;
  }
};
