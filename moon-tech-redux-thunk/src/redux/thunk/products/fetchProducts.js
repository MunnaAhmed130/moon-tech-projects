import { loadProduct } from "../../actions/productAction";

// this is a actionCreator that returns function instead of an object using thunk
const loadProductData = () => {
  return async (dispatch, getState) => {
    const res = await fetch(
      // "https://moon-tech-server-01.vercel.app/product"
      "http://localhost:4000/products"
    );
    const data = await res.json();
    if (data.length) {
      dispatch(loadProduct(data));
    }
  };
};

export default loadProductData;
