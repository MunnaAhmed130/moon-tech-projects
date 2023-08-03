import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const ProductList = () => {
  // const { products, isLoading, isError, error, deleteSuccess } = useSelector(
  //   (state) => state.products
  // );
  const dispatch = useDispatch();

  const { data } = useGetProductsQuery();

  const products = data;
  console.log(products);
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:4000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);
  // useEffect(() => {
  //   if (!isLoading && deleteSuccess) {
  //     toast.success("Product successfully removed", { id: "removeProduct" });
  //     dispatch(toggleDeleteSuccess());
  //   }

  //   if (!isLoading && isError) {
  //     toast.error(error, { id: "removeProduct" });
  //   }
  // }, [isLoading, deleteSuccess, error, isError]);

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full ">
      <div className="w-full max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <div className="font-semibold text-gray-800">Products</div>
        </header>

        <div className="overflow-x-auto p-3">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th></th>
                <th className="p-2">
                  <div className="font-semibold text-left">Product Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Brand</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">In Stock</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Price</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Action</div>
                </th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-gray-100">
              {products &&
                products.map((productData) => (
                  <ProductRow {...productData} key={productData.model} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // </section>
  );
};

const ProductRow = (productData) => {
  const { model, brand, price, status, _id } = productData;
  return (
    <tr>
      <td className="p-2">
        <input type="checkbox" className="w-5 h-5" value="id-1" />
      </td>
      <td className="p-2">
        <div className="font-medium text-gray-800">{model}</div>
      </td>
      <td className="p-2">
        <div className="text-left capitalize">{brand}</div>
      </td>
      <td className="p-2">
        <div className="text-left">
          {status ? (
            <p className="text-green-500 font-medium">Available</p>
          ) : (
            <p className="text-red-500 font-medium">Stock out</p>
          )}
        </div>
      </td>
      <td className="p-2">
        <div className="text-left font-medium text-indigo-500">{price}</div>
      </td>
      <td className="p-2">
        <div className="flex justify-center">
          <button onClick={() => dispatch(removeProduct(_id))}>
            <svg
              className="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
          <Link to={`edit-product/${_id}`}>
            <BiEditAlt
              className="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1 ml-2"
              // onClick={() => console.log(_id)}
            />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ProductList;
