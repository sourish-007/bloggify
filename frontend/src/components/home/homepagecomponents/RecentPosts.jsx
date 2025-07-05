import React from 'react';
import Pagination from './Pagination.jsx';

const RecentPosts = ({ recent, isLoading, darkMode }) => (
  <div className="lg:col-span-2">
    <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      Recent Posts
    </h2>
    {isLoading ? (
      <div className="space-y-6">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`animate-pulse p-6 rounded-lg shadow-md ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
            <div className="h-3 bg-gray-300 rounded w-full mb-2" />
            <div className="h-3 bg-gray-300 rounded w-5/6 mb-4" />
            <div className="flex justify-between">
              <div className="h-3 bg-gray-300 rounded w-20" />
              <div className="h-3 bg-gray-300 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="space-y-6">
        {recent.map(post => (
          <div
            key={post.id}
            className={`p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${
              darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  <a
                    href="#"
                    className={`${darkMode ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'}`}
                  >
                    {post.title}
                  </a>
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm">
                  <span className="mr-4">{post.author}</span>
                  <span className="mr-4">{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <button className={`rounded-full p-2 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}>
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
                    d="M5 12h.01M12 12h.01M19 12h.01
                       M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0
                       11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 
                       0 012 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-3">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`inline-block text-xs px-2 py-1 mr-2 rounded-md ${
                    darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
    <Pagination darkMode={darkMode} />
  </div>
);

export default RecentPosts;