import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import search from "../static/search.png";
import dataActions from "../actions/dataActions";

const Search = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    let searchText = e.target.value;
    if (searchText === "") {
      searchText = "all";
    }
    dispatch(dataActions.searchText(searchText));
  };

  return (
    <div>
      <form class="flex flex-row">
        <input
          placeholder="Search Academic Colab"
          class="rounded-full py-2 px-6 w-80 shadow appearance-none bg-[rgb(239,242,245)] leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={handleSearch}
        />
        <button
          class="text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline ml-2"
          // disabled={loading}
        >
          <img src={search} alt="search" class="h-6 w-6" />
        </button>
      </form>
    </div>
  );
};

export default Search;
