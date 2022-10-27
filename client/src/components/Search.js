import React, { useState } from "react";
import search from "../static/search.png";
const Search = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <form class="flex flex-row">
        <input
          placeholder="Search Academic Colab"
          class="rounded-full py-2 px-6 w-80 shadow appearance-none bg-[rgb(239,242,245)] leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          class="text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline ml-6"
          // disabled={loading}
        >
          <img src={search} alt="search" class="h-6 w-6" />

          {/* {loading === true ? (
          <svg
            class=" bg-blue-500 border-t-white border-2 rounded-full animate-spin h-5 w-5 mr-3  ..."
            viewBox="0 0 24 24"
          ></svg>
        ) : null} */}
        </button>
      </form>
    </div>
  );
};

export default Search;
