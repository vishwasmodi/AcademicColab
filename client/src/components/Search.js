import React, { useState } from "react";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div class="">
      <form class="flex flex-row">
        <input
          class="rounded-md px-36 py-2 shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-6"
          // disabled={loading}
        >
          <span>Search</span>
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
