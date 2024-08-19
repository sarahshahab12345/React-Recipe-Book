import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalState } from "./GlobalContext";

function Search() {
  const { searchParam, setsearchParam, fetchData } = useContext(GlobalState); // Ensure naming consistency

  const onFormSubmit = (elem) => {
    elem.preventDefault();
    fetchData();
  };

  return (
    <div>
      <div className="container mx-auto flex justify-between items-center py-8">
        <div className="logo">
          <h2 className="text-2xl font-bold">Recipe App</h2>
        </div>
        <div className="flex-grow flex justify-center">
          <form onSubmit={onFormSubmit} className="w-full max-w-lg relative">
            <input
              value={searchParam}
              onChange={(e) => setsearchParam(e.target.value)}
              placeholder="Search Here"
              className="outline-none border-none py-4 pl-10 pr-6 bg-white/75 shadow-lg shadow-red-200 hover:shadow-red-300 duration-300 rounded-full w-full"
            />
            <i
              className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              aria-hidden="true"
            ></i>
          </form>
        </div>
        <div className="nav">
          <ul className="flex gap-3">
            <li>
              <NavLink
                className="text-black hover:text-gray-800 duration-300 text-xl"
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-black hover:text-gray-800 duration-300 text-xl"
                to={"/favourites"}
              >
                Favourites
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Search;
