import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../lib/axios.js';

const Categories = ({ darkMode }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get('/blog/categories');
        setCategories(res.data.data || []);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetch();
  }, []);

  return (
    <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Categories</h3>
      <div className="space-y-2">
        {categories.map((cat, i) => (
          <div key={i} className="flex justify-between items-center">
            <a href="#" className={`text-sm ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              {cat.name}
            </a>
            <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              {cat.count}
            </span>
          </div>
        ))}
        {categories.length === 0 && (
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No categories.</p>
        )}
      </div>
      <a
        href="#"
        className={`block text-center mt-4 text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
      >
        View All Categories
      </a>
    </div>
  );
};

export default Categories;