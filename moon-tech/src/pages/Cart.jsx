import React from "react";
import { BiListPlus } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { useProducts } from "../context/ProductProvider";
import { actionTypes } from "../state/ProductState/actionTypes";

const Cart = () => {
    const {
        state: { loading, cart, error },
        dispatch,
    } = useProducts();

    console.log(cart);
    let content;

    if (loading) {
        content = <p>Loading</p>;
    }

    if (error) {
        content = <p>something went wrong</p>;
    }

    if (!loading && !error && cart.length === 0) {
        content = <p>Nothing to show, product list is empty</p>;
    }

    if (!loading && !error && cart.length) {
        content = cart.map((product) => (
            <div className="shadow-lg rounded-3xl border  p-3 flex flex-col text-indigo-900 my-4">
                <div className="h-52 w-52 mx-auto">
                    <img src={product.image} alt={product.model} />
                </div>
                <h1 className="font-bold text-center">{product.model}</h1>
                <p className="text-center font-semibold mb-3">
                    Rating: {product.rating}
                </p>
                <div className=" flex-1">
                    <ul className="space-y-2">
                        {product.keyFeature.map((feature) => {
                            return <li className="text-sm ">{feature}</li>;
                        })}
                    </ul>
                </div>
                <div className="flex gap-2 mt-5">
                    <button
                        className="bg-indigo-500 rounded-full py-1 px-2 flex-1 text-white text-bold"
                        onClick={() =>
                            dispatch({
                                type: actionTypes.REMOVE_FROM_CART,
                                payload: cart.indexOf(product),
                            })
                        }
                    >
                        Remove from cart
                    </button>
                    <button
                        className="bg-indigo-500 rounded-full py-1 px-2 flex-1 text-white text-bold"
                        onClick={() =>
                            dispatch({
                                type: actionTypes.REMOVE_FROM_CART,
                                payload: cart.indexOf(product),
                            })
                        }
                    >
                        Buy Product
                    </button>
                    {/* <button
                        title="Add to wishlist"
                        className="bg-indigo-500  py-1 px-2 rounded-full"
                    >
                        <BiListPlus className="text-white" />
                    </button> */}
                </div>
            </div>
        ));
    }

    return (
        <div
            className={`${
                cart.length > 0 && `grid`
            }  grid-rows-1 md:grid-rows-2 grid-cols-1 md:grid-cols-2 gap-4 mt-4 `}
        >
            {content}
        </div>
    );
};

export default Cart;
