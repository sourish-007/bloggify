import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../lib/axios.js';

const TopAuthors = ({ darkMode }) => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get('/user/top-authors?limit=5');
        setAuthors(res.data.data || []);
      } catch (err) {
        console.error('Failed to load top authors', err);
      }
    };
    fetch();
  }, []);

  return (
    <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        Top Authors
      </h3>
      <div className="space-y-4">
        {authors.map((author, i) => {
          const initial = author.name.charAt(0).toUpperCase();
          return (
            <div key={i} className="flex items-center">
              <div
                className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-medium"
              >
                {initial}
              </div>
              <div className="ml-3 flex-1">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {author.name} <span className="text-xs text-gray-500">@{author.username}</span>
                </p>
                <div className="text-xs flex space-x-3 mt-1">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {author.followersCount.toLocaleString()} followers
                  </span>
                  {author.totalReadMinutes !== undefined && (
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {author.totalReadMinutes} min read
                    </span>
                  )}
                  {author.totalReceivedLikes !== undefined && (
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {author.totalReceivedLikes} likes
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {authors.length === 0 && (
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No authors to display.</p>
        )}
      </div>
      <a
        href="#"
        className={`block text-center mt-4 text-sm font-medium ${
          darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
        }`}
      >
        View All Authors
      </a>
    </div>
  );
};

export default TopAuthors;