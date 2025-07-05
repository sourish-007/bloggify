import React from 'react';

const NewsletterSubscription = ({ darkMode }) => (
  <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Newsletter</h3>
    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      Get the latest posts delivered straight to your inbox.
    </p>
    <div className="space-y-3">
      <input
        type="email"
        className={`w-full py-2 px-4 rounded-md border focus:ring-2 focus:outline-none ${
          darkMode 
            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-300'
        }`}
        placeholder="Your email address"
      />
      <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-md">
        Subscribe
      </button>
    </div>
  </div>
);

export default NewsletterSubscription;