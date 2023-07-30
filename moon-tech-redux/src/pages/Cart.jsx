import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl gap-14 mx-auto my-10">
      {/* sort the cart */}
      {cart
        .sort((a, b) => a.id - b.id)
        .map((product) => (
          <ProductCard product={product} key={product.id}></ProductCard>
        ))}
    </div>
  );
};

export default Cart;
