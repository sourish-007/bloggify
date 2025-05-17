import React from 'react';

const NewsletterBanner = ({ darkMode }) => (
  <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-50'} py-12`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`rounded-xl overflow-hidden shadow-xl ${darkMode ? 'bg-gradient-to-r from-gray-900 to-blue-900' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}>
        <div className="px-6 py-12 md:py-16 md:px-12 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to dive deeper?</span>
            <span className="block">Start your writing journey today.</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-xl text-blue-100">
            Join thousands of tech enthusiasts who share their knowledge and insights on our platform.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
                Create Account
              </a>
            </div>
            <div className="ml-3 inline-flex">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 bg-opacity-30 hover:bg-opacity-40">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NewsletterBanner;