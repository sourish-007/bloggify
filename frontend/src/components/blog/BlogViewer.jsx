import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios.js';
import Navbar from '../home/homepagecomponents/Navbar.jsx';

const BlogViewer = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [following, setFollowing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const getAuthToken = () => {
    const tokenKeys = ['token', 'Token', 'authToken', 'auth_token', 'accessToken', 'access_token'];
    
    for (const key of tokenKeys) {
      const token = localStorage.getItem(key);
      if (token) {
        console.log(`Found token with key: ${key}`);
        return { token, key };
      }
    }
    
    return { token: null, key: null };
  };

  useEffect(() => {
    const { token } = getAuthToken();
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    console.log('Initial check - token exists:', !!token);
    console.log('All localStorage keys:', Object.keys(localStorage));
    
    setIsLoggedIn(!!token);
    if (token && userData) {
      setCurrentUser(userData);
    }
    
    axiosInstance
      .get(`/blog/${blogId}`)
      .then(res => {
        const data = res.data.data;
        setBlog(data);
        setLikes(data.likes || 0);
        setLiked(data.likedByUser || false);
        setFollowing(data.authorFollowing || false);
      })
      .catch(err => console.error(err));
  }, [blogId]);

  const toggleLike = async () => {
    const { token, key } = getAuthToken();
    
    console.log('Like action - token exists:', !!token);
    
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }
    
    if (!blog) return;
    
    try {
      const url = liked
        ? `/blog/${blog.blogId}/unlike`
        : `/blog/${blog.blogId}/like`;
      const res = await axiosInstance.post(url);
      console.log('Like response:', res.data);
      setLikes(res.data.data.likes);
      setLiked(!liked);
    } catch (err) {
      console.error('Like error:', err);
      if (err.response && err.response.status === 401) {
        if (key) localStorage.removeItem(key);
        navigate('/login');
      }
    }
  };

  const toggleFollow = async () => {
    const { token, key } = getAuthToken();
    
    console.log('Follow action - token exists:', !!token);
    
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }
    
    if (!blog) return;
    
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const currentUsername = userData.username;
      
      if (!currentUsername) {
        console.log('No username found in localStorage');
        navigate('/login');
        return;
      }

      const authorUsername = blog.authorUsername;
      
      console.log('Blog author (name):', blog.author);
      console.log('Author username:', authorUsername);
      
      if (!authorUsername) {
        console.log('Could not find username for author:', blog.author);
        return;
      }

      if (currentUsername === authorUsername) {
        console.log('Cannot follow yourself');
        return;
      }
      
      const url = following
        ? `/user/${authorUsername}/unfollow`  
        : `/user/${authorUsername}/follow`;  
        
      console.log('Attempting to follow/unfollow with URL:', url);
      const res = await axiosInstance.post(url);
      console.log('Follow response:', res.data);
      setFollowing(!following);
    } catch (err) {
      console.error('Follow error:', err);
      
      if (err.response && err.response.status === 401) {
        if (key) localStorage.removeItem(key);
        navigate('/login');
      } else if (err.response && err.response.status === 404) {
        console.error('The follow API endpoint does not exist at:', err.config?.url);
        console.error('Please ensure the backend has this route implemented.');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/u/${currentUser?.username}/edit-blog/${blog.blogId}`);
  };

  if (!blog) return null;

  const isAuthor = currentUser && blog.authorUsername === currentUser.username;

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen flex flex-col`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-4xl mx-auto flex-grow px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center space-x-4 mb-8">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-medium">
            {blog.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">@{blog.author}</p>
            <p className="text-sm text-gray-500">{blog.date} • {blog.readTime}</p>
          </div>
          
          {isLoggedIn && !isAuthor && (
            <button
              onClick={toggleFollow}
              className={`ml-auto px-4 py-1 text-sm rounded-md border cursor-pointer ${
                following
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-transparent text-blue-600 border-blue-600'
              }`}
            >
              {following ? 'Unfollow' : 'Follow'}
            </button>
          )}
          
          {isAuthor && (
            <button
              onClick={handleEdit}
              className="ml-auto px-4 py-1 text-sm rounded-md border bg-blue-600 text-white"
            >
              Edit
            </button>
          )}
        </div>

        <article className="prose dark:prose-invert mb-8">
          <p>{blog.body}</p>
        </article>

        <div className="flex items-center space-x-6">
          <button onClick={toggleLike} className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${liked ? 'text-red-500' : 'text-gray-500'} cursor-pointer`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4
                   4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4
                   0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span>{likes}</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default BlogViewer;