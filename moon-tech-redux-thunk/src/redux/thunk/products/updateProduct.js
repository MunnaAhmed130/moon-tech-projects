import { updateProduct } from "../../actions/productAction";

const updateProductData = (product, id) => {
  return async (dispatch, getState) => {
    const res = await fetch(
      // `https://moon-tech-server-01.vercel.app/product/${id}`,
      `http://localhost:4000/products/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    // console.log(data);
  };
};

export default updateProductData;
