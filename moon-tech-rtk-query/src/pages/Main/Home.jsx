import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import {
  toggle,
  toggleBrands,
  clearAll,
} from "../../features/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Home = () => {
  const { brands, stock, clear } = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:4000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  // const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery(
  //   null,
  //   { refetchOnMountOrArgChange: true }
  // );

  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();

  // console.log(data);

  const products = data;

  const activeClass = "text-white  bg-indigo-500 border-white";

  let content;

  if (isLoading) {
    content = <h2 className="text-center w-full">Loading ..</h2>;
  }
  if (isError) {
    content = <h2>Something went wrong:{error.status}</h2>;
  }

  if (products) {
    content = products.map((product) => (
      <ProductCard product={product} key={product.model} />
    ));
  }

  if (products && (stock || brands.length)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (brands.length) {
          return brands.includes(product.brand);
        }
        return product;
      })
      .map((product) => <ProductCard product={product} key={product.model} />);
  }

  if (products && clear) {
    content = products.map((product) => (
      <ProductCard product={product} key={product.model} />
    ));
  }

  // if (keyword) {
  //   content = products
  //     .filter((product) =>
  //       product.model.toUpperCase().includes(keyword.toUpperCase())
  //     )
  //     .map((product) => <ProductCard product={product} key={product.model} />);
  // }

  return (
    <div className="max-w-7xl gap-14 mx-auto my-10">
      <div className="mb-10 flex justify-end gap-5">
        <button
          onClick={() => dispatch(clearAll())}
          className={`border px-3 py-2 rounded-full font-semibold
                    ${clear ? activeClass : null}
                    `}
        >
          Clear Filters
        </button>
        <button
          onClick={() => dispatch(toggle())}
          className={`border px-3 py-2 rounded-full font-semibold ${
            stock ? activeClass : null
          } `}
        >
          In Stock
        </button>
        <button
          onClick={() => dispatch(toggleBrands("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("amd") ? activeClass : null
          } `}
        >
          AMD
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("intel") ? activeClass : null
          }`}
          onClick={() => dispatch(toggleBrands("intel"))}
        >
          Intel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        {content}
      </div>
    </div>
  );
};

export default Home;
