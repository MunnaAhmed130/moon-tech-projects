import React from "react";
import { BiListPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { AiFillDelete } from "react-icons/ai";
import {
  addToCart,
  removeFromCart,
} from "../redux/actionCreators/productActions";
// import { ADD_TO_CART } from "../redux/actionTypes/actionTypes";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // if (pathname.includes("cart")) {
  //     console.log("cart");
  // }

  return (
    <div
      className="shadow-lg rounded-3xl border  p-3 flex flex-col text-indigo-900"
      key={product._id}
    >
      <div className="h-52 w-52 mx-auto">
        <img src={product.image} alt={product.model} />
      </div>

      <h1 className="font-bold text-center">{product.model}</h1>
      <p className="text-center font-semibold mb-3">Rating: {product.rating}</p>

      <div className=" flex-1">
        <ul className="space-y-2">
          {product.keyFeature.map((feature) => {
            return (
              <li className="text-sm mx-1" key={feature}>
                {feature}
              </li>
            );
          })}
        </ul>
      </div>

      {pathname.includes("cart") && (
        <div>
          <p>Quantity : {product.quantity}</p>
        </div>
      )}

      <div className="">
        {!pathname.includes("cart") && (
          <div className="flex gap-2 mt-5">
            <button
              className="bg-indigo-500 rounded-full py-1 px-2 flex-1 text-white text-bold"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to cart
            </button>

            <button
              title="Add to wishlist"
              className="bg-indigo-500  py-1 px-2 rounded-full"
            >
              <BiListPlus className="text-white" />
            </button>
          </div>
        )}

        {pathname.includes("cart") && (
          <div className="flex gap-2 mt-5 mx-2">
            <button
              className="bg-red-500 justify-between rounded-full py-1 px-8  flex flex-1 text-white text-bold"
              onClick={() => dispatch(removeFromCart(product))}
            >
              Remove from cart
              <AiFillDelete className="mt-0.5 text-lg" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
