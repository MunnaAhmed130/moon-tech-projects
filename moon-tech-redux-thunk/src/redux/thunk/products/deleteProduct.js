import { removeProduct } from "../../actions/productAction";

const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const res = await fetch(
      // `https://moon-tech-server-01.vercel.app/product/${id}`,
      `http://localhost:4000/products/${id}`,
      {
        method: "DELETE",
        // body: JSON.stringify(product),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (data.acknowledged) {
      dispatch(removeProduct(id));
    }
  };
};

export default deleteProduct;
