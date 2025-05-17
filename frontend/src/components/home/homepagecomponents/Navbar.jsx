import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const handleClick = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const initial = user?.name?.charAt(0).toUpperCase() || '';

  return (
    <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg sticky top-0 z-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
          >
            Bloggify
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3
                       m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707
                       m12.728 0l-.707.707M6.343 17.657l-.707.707
                       M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646
                       9.003 9.003 0 0012 21a9.003 9.003 0 
                       008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(o => !o)}
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {initial}
                </button>

                {menuOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-white'
                    } ring-1 ring-black ring-opacity-5 z-20`}
                  >
                    <Link
                      to={`/u/${user.username}`}
                      className={`block px-4 py-2 text-sm ${
                        darkMode ? 'text-gray-100 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to={`/u/${user.username}/blogs`}
                      className={`block px-4 py-2 text-sm ${
                        darkMode ? 'text-gray-100 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      My Blogs
                    </Link>
                    <Link
                      to={`/u/${user.username}/create-blog`}
                      className={`block px-4 py-2 text-sm ${
                        darkMode ? 'text-gray-100 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      Create Blog
                    </Link>
                    <button
                      onClick={logout}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        darkMode ? 'text-gray-100 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;