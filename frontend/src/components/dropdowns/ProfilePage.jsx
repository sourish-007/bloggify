import React, { useState, useEffect } from 'react';
import Navbar from '../home/homepagecomponents/Navbar.jsx';

const ProfilePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  if (!user) return null;

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="pt-16 pb-24 px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center md:items-start mb-16 md:space-x-10">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-4xl md:text-5xl font-bold flex items-center justify-center rounded-xl mb-6 md:mb-0">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex flex-col items-center md:items-start w-full">
            <div className="flex justify-between w-full items-center mb-4">
              <div>
                <h1 className="text-4xl font-bold">{user.name}</h1>
                <p className="text-lg text-gray-500 mt-1">@{user.username}</p>
              </div>
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 font-medium">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          <div className="flex flex-col">
            <h2 className="text-xl font-medium mb-3">Email</h2>
            <p className="text-lg break-all">{user.email}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-medium mb-3">Followers</h2>
            <p className="text-lg">{user.followers}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-medium mb-3">Following</h2>
            <p className="text-lg">{user.following}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-medium mb-3">Liked Blogs</h2>
            <p className="text-lg">{(user.likedBlogs || []).length}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-medium mb-3">Total Read Minutes</h2>
            <p className="text-lg">{user.totalReadMinutes || 0}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-medium mb-3">Total Likes on Blogs</h2>
            <p className="text-lg">{user.totalReceivedLikes || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;