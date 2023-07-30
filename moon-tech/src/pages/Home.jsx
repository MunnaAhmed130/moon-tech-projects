import React from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductProvider";

const Home = () => {
  const {
    state: { products, loading, error, cart },
  } = useProducts();
  console.log(products);
  let content;

  //   let array = [1, 2, 3];
  //   array.splice(1, 1);
  //   console.log(array);

  if (loading) {
    content = <p>Loading</p>;
  }

  if (error) {
    content = <p>something went wrong</p>;
  }

  if (!loading && !error && products.length === 0) {
    content = <p>Nothing to show, product list is empty</p>;
  }

  if (!loading && !error && products.length) {
    content = products.map((product) => (
      <ProductCard product={product} key={product.model} />
    ));
  }

  return (
    <div
      className={`${
        products.length > 0 && `grid`
      }  grid-rows-1 md:grid-rows-2 grid-cols-1 md:grid-cols-2 gap-4 mt-4`}
    >
      {content}
    </div>
  );
};

export default Home;
