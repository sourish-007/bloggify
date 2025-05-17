import React from 'react';

const Pagination = ({ darkMode }) => (
  <div className="mt-8 flex justify-center">
    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
      <a
        href="#"
        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
          darkMode
            ? 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'
            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
        }`}
      >
        <span className="sr-only">Previous</span>
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414
               10l3.293 3.293a1 1 0 01-1.414 
               1.414l-4-4a1 1 0 010-1.414l4-4a1 
               1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      {[1, 2, 3].map(n => (
        <a
          key={n}
          href="#"
          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
            n === 1
              ? darkMode
                ? 'bg-gray-700 border-gray-700 text-white'
                : 'bg-blue-50 border-blue-500 text-blue-600'
              : darkMode
              ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          {n}
        </a>
      ))}
      <span
        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
          darkMode ? 'border-gray-700 bg-gray-800 text-gray-500' : 'border-gray-300 bg-white text-gray-700'
        }`}
      >
        …
      </span>
      {[8, 9, 10].map(n => (
        <a
          key={n}
          href="#"
          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
            darkMode
              ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          {n}
        </a>
      ))}
      <a
        href="#"
        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
          darkMode
            ? 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'
            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
        }`}
      >
        <span className="sr-only">Next</span>
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 
               10l-3.293-3.293a1 1 0 011.414-1.414l4 
               4a1 1 0 010 1.414l-4 4a1 1 0 
               01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </nav>
  </div>
);

export default Pagination;