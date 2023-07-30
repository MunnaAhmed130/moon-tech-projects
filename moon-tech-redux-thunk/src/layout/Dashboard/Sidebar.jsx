import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="col-span-2 bg-indigo-200 h-[calc(100vh-25px)] rounded-lg overflow-x-hidden">
      <h5 className=" bg-indigo-500/40 text-indigo-800 font-bold py-3 px-5 ">
        Admin Dashboard
      </h5>
      <ul className="flex gap-3 px-5 py-3 flex-col h-[calc(100vh-75px)]">
        <li>
          <Link to="/dashboard">Product List</Link>
        </li>
        <li>
          <Link to="add-product"> Add Product </Link>
        </li>
        <li className="mt-auto">
          <Link to="/"> Back to Home </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
