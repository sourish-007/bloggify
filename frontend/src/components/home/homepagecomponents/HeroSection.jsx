import React from 'react';

const HeroSection = ({ darkMode }) => (
  <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
    <div className="max-w-7xl mx-auto">
      <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className={`block ${darkMode ? 'text-white' : 'text-gray-900'} xl:inline`}>
                Discover ideas that
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 xl:inline">
                shape the future
              </span>
            </h1>
            <p className={`mt-3 text-base ${darkMode ? 'text-gray-300' : 'text-gray-500'} sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0`}>
              Join our community of passionate tech enthusiasts, developers, and creative minds. Share your knowledge, learn from experts, and stay updated with the latest trends.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 md:py-4 md:text-lg md:px-10">
                  Start Reading
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a href="#" className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md ${darkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'} md:py-4 md:text-lg md:px-10`}>
                  Create Account
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        src="/api/placeholder/800/600"
        alt="Blog hero"
      />
    </div>
  </div>
);

export default HeroSection;