import React from 'react';

const SearchBox = ({ darkMode }) => (
  <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Search</h3>
    <div className="relative">
      <input
        type="text"
        placeholder="Search posts..."
        className={`w-full py-2 px-4 pr-10 rounded-md border focus:ring-2 focus:outline-none ${
          darkMode
            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-300'
        }`}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  </div>
);

export default SearchBox;