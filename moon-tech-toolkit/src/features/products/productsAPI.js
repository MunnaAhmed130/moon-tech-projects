import axios from "../../utils/axios.config";

export const fetchProducts = async () => {
  //   const res = await fetch("http://localhost:4000");
  //   const data = await res.json();
  const data = await axios.get("/products");
  // console.log(data);
  return data.data;
};

export const postProduct = async (productData) => {
  await axios.post("/products", productData);
};

export const deleteProduct = async (_id) => {
  await axios.delete(`/products/${_id}`);
};

export const updateProduct = async (product) => {
  await axios.put(`/products/${product._id}`, product);
};
