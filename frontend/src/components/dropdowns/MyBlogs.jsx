import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../lib/axios.js';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../home/homepagecomponents/Navbar.jsx';

const MyBlogs = () => {
  const { username } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/blog/user/${username}`)
      .then(res => setBlogs(res.data.data || []))
      .catch(err => {
        console.error('Error fetching user blogs:', err);
        setBlogs([]);
      });
  }, [username]);

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axiosInstance.delete(`/blog/${blogId}`);
      setBlogs(bs => bs.filter(b => b.blogId !== blogId));
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete. Please try again.');
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="pt-16 pb-24 px-6 md:px-12">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">My Blogs</h1>
          </div>
          <button
            onClick={() => navigate(`/u/${username}/create-blog`)}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md"
          >
            + New Blog
          </button>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="mb-4">You haven't written any blogs yet.</p>
            <button
              onClick={() => navigate(`/u/${username}/create-blog`)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md"
            >
              Create Your First Blog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {blogs.map(blog => (
              <div
                key={blog.blogId}
                className={`p-6 rounded-lg shadow-md transition hover:shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <Link to={`/b/${blog.blogId}`}>
                  <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">
                    {blog.title}
                  </h2>
                </Link>
                <div className="flex items-center text-sm mb-4 space-x-4">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                  <span>•</span>
                  <span>❤️ {blog.likes}</span>
                  <span>•</span>
                  <span>👁️ {blog.views}</span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleDelete(blog.blogId)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/u/${username}/edit/${blog.blogId}`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;