import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../lib/axios.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../home/homepagecomponents/Navbar.jsx';

const CreateBlog = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [blog, setBlog] = useState({
    title: '',
    excerpt: '',
    body: '',
    tags: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const calculateReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    try {
      const tagsArray = blog.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t);

      const payload = {
        title: blog.title,
        excerpt: blog.excerpt,
        body: blog.body,
        tags: tagsArray
      };

      await axiosInstance.post('/blog/publish', payload);

      navigate(`/u/${user.username}/blogs`);
    } catch (err) {
      setFormError('Failed to publish blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="pt-16 pb-24 px-6 md:px-12">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold">Create New Blog</h1>
        </div>

        {formError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-lg font-medium mb-2">Title</label>
              <input
                id="title"
                name="title"
                value={blog.title}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                placeholder="Enter a captivating title"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="excerpt" className="block text-lg font-medium mb-2">Excerpt</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={blog.excerpt}
                onChange={handleChange}
                required
                rows="2"
                className={`w-full px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                placeholder="Write a short summary of your blog"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="body" className="block text-lg font-medium mb-2">Content</label>
              <textarea
                id="body"
                name="body"
                value={blog.body}
                onChange={handleChange}
                required
                rows="12"
                className={`w-full px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                placeholder="Write your blog content here..."
              />
            </div>

            <div className="mb-6">
              <label htmlFor="tags" className="block text-lg font-medium mb-2">Tags</label>
              <input
                id="tags"
                name="tags"
                value={blog.tags}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                placeholder="technology, programming, web development"
              />
              <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Separate tags with commas</p>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md disabled:opacity-50"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Blog'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/u/${user?.username}/blogs`)}
                className={`px-6 py-3 rounded-md ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;