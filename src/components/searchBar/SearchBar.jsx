import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch, error }) => {
  const [query, setQuery] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 800);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      onSearch(query);
    } else {
      setShowError(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto px-4 sm:px-0">
      {/* Wrapper with responsive layout */}
      <div className="flex flex-col sm:flex-row w-full gap-3">
        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search city..."
          className="w-full px-4 py-3 border rounded-lg shadow-md focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none text-lg
                     bg-white text-gray-800 placeholder-gray-500 border-gray-300 
                     dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-blue-600"
        />

        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          className="w-full sm:w-1/3 px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95
                     dark:from-blue-600 dark:to-blue-800 dark:hover:shadow-blue-900"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {showError && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-red-500 text-white text-center p-2 rounded-lg shadow-lg transition-opacity duration-300 text-sm sm:text-base">
          {error || "Enter a valid city name!"}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
