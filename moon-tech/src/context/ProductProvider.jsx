import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { actionTypes } from "../state/ProductState/actionTypes";
import {
  initialState,
  productReducer,
} from "../state/ProductState/productReducer";

export const PRODUCTS_CONTEXT = createContext();

const ProductProvider = ({ children }) => {
  // const [data, setData] = useState([]);

  const [state, dispatch] = useReducer(productReducer, initialState);
  useEffect(() => {
    dispatch({ type: actionTypes.FETCHING_START });
    // fetch("http://localhost:4000/all")
    fetch("./products.JSON")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: data })
      )
      .catch(() => {
        dispatch({ type: actionTypes.FETCHING_ERROR });
      });
  }, []);
  // console.log(state.products);
  // const products = state.products;
  const value = { state, dispatch };
  // console.log(value);
  return (
    <PRODUCTS_CONTEXT.Provider value={value}>
      {children}
    </PRODUCTS_CONTEXT.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(PRODUCTS_CONTEXT);
  return context;
};

export default ProductProvider;
