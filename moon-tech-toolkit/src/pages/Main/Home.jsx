import { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import {
  toggle,
  toggleBrands,
  clearAll,
} from "../../features/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productsSlice";

const Home = () => {
  const { brands, stock, clear } = useSelector((state) => state.filter);
  const { products, isLoading, isError, error } = useSelector(
    (state) => state.products
  );
  //   const keyword = useSelector((state) => state.filter.keyword);
  //   const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const activeClass = "text-white  bg-indigo-500 border-white";

  let content;

  if (isLoading) {
    content = <h2>Loading ..</h2>;
  }
  if (isError) {
    content = <h2>{error}</h2>;
  }
  if (products.length) {
    content = products.map((product) => (
      <ProductCard product={product} key={product.model} />
    ));
  }

  if (products.length && (stock || brands.length)) {
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

  // if (products.length && clear) {
  //   content = products.map((product) => (
  //     <ProductCard product={product} key={product.model} />
  //   ));
  // }
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
