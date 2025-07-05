import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../lib/axios.js';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../home/homepagecomponents/Navbar.jsx';

const EditBlog = () => {
  const { username, blogId } = useParams();
  const [darkMode, setDarkMode] = useState(false);
  const [blog, setBlog] = useState({
    title: '',
    excerpt: '',
    body: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/blog/${blogId}`)
      .then(res => {
        const data = res.data.data;
        setBlog({
          title: data.title,
          excerpt: data.excerpt,
          body: data.body,
          tags: (data.tags || []).join(', ')
        });
      })
      .catch(err => {
        console.error('Error fetching blog for edit:', err);
        setFormError('Could not load blog.');
      });
  }, [blogId]);

  const calculateReadTime = text => {
    const wpm = 200;
    const count = text.trim().split(/\s+/).length;
    return `${Math.ceil(count / wpm)} min read`;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
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
        tags: tagsArray,
        readTime: calculateReadTime(blog.body)
      };
      await axiosInstance.put(`/blog/${blogId}`, payload);
      navigate(`/u/${username}/blogs`);
    } catch (err) {
      console.error('Error updating blog:', err);
      setFormError('Failed to update blog.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="pt-16 pb-24 px-6 md:px-12">
        <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

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
                className={`w-full px-4 py-3 rounded-md border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
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
                className={`w-full px-4 py-3 rounded-md border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
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
                className={`w-full px-4 py-3 rounded-md border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="tags" className="block text-lg font-medium mb-2">Tags</label>
              <input
                id="tags"
                name="tags"
                value={blog.tags}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                placeholder="tag1, tag2, tag3"
              />
              <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Separate tags with commas
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md disabled:opacity-50"
              >
                {isSubmitting ? 'Updating...' : 'Update Blog'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/u/${username}/blogs`)}
                className={`px-6 py-3 rounded-md ${
                  darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'
                }`}
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

export default EditBlog;