import React from 'react';

const FeaturedPosts = ({ featured, isLoading, darkMode }) => (
  <div className="px-4 py-6">
    <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      Featured Posts
    </h2>
    <div className="mt-6 grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {isLoading
        ? [1, 2, 3].map(i => (
            <div key={i} className={`animate-pulse rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="h-48 bg-gray-300" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-300 rounded w-full" />
                <div className="h-3 bg-gray-300 rounded w-5/6" />
              </div>
            </div>
          ))
        : featured.map(post => (
            <div
              key={post.id}
              className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className={`font-bold text-xl mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {post.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} line-clamp-3`}>
                  {post.excerpt}
                </p>
                <div className="flex items-center mt-4">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="h-10 w-10 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {post.author}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {post.date} • {post.readTime}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${darkMode ? 'text-red-400' : 'text-red-500'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343
                           l1.172-1.171a4 4 0 115.656 5.656L10
                           17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={`ml-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {post.likes}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 bg-opacity-10 rounded-full px-3 py-1 text-sm text-white mr-2 mb-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
    </div>
  </div>
);

export default FeaturedPosts;