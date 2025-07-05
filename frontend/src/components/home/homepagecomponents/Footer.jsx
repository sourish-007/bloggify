import React from 'react';

const Footer = ({ darkMode }) => (
  <footer className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} pt-12 pb-8`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          &copy; 2025 Bloggify. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;