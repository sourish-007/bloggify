import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios.js';

const LoginSignupPage = ({ loginMode = true }) => {
  const [isLogin, setIsLogin] = useState(loginMode);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(loginMode);
  }, [loginMode]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      let res;
      if (isLogin) {
        res = await axiosInstance.post('/user/login', {
          email: formData.email,
          password: formData.password
        });
      } else {
        res = await axiosInstance.post('/user/signup', {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
      }

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.data));

      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                Bloggify
              </span>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Link to="/login" className={`px-4 py-2 mr-3 text-sm font-medium rounded-md ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign Up
              </Link>
              <button onClick={() => setDarkMode(!darkMode)} className="ml-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 
                         6.364l-.707-.707M6.343 6.343l-.707-.707
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
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold">
              {isLogin ? 'Login to your account' : 'Create a new account'}
            </h2>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-md border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-md border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
              />
            </div>

            <div>
              <button type="submit"
                className="w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 font-medium">
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="text-sm text-center mt-4">
            {isLogin ? (
              <>Not a user? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></>
            ) : (
              <>Already a user? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;