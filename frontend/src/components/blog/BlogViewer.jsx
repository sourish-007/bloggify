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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const getAuthToken = () => {
    const tokenKeys = ['token', 'Token', 'authToken', 'auth_token', 'accessToken', 'access_token'];
    for (const key of tokenKeys) {
      const token = localStorage.getItem(key);
      if (token) {
        return { token, key };
      }
    }
    return { token: null, key: null };
  };

  const formatFullDateTime = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  useEffect(() => {
    const { token } = getAuthToken();
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
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

    axiosInstance
      .get(`/comment/${blogId}/view-comments`)
      .then(res => {
        setComments(res.data.comments || []);
      })
      .catch(err => console.error(err));
  }, [blogId]);

  const toggleLike = async () => {
    const { token, key } = getAuthToken();
    if (!token) {
      navigate('/login');
      return;
    }
    if (!blog) return;
    try {
      const url = liked
        ? `/blog/${blog.blogId}/unlike`
        : `/blog/${blog.blogId}/like`;
      const res = await axiosInstance.post(url);
      setLikes(res.data.data.likes);
      setLiked(!liked);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        if (key) localStorage.removeItem(key);
        navigate('/login');
      }
    }
  };

  const toggleFollow = async () => {
    const { token, key } = getAuthToken();
    if (!token) {
      navigate('/login');
      return;
    }
    if (!blog) return;
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const currentUsername = userData.username;
      if (!currentUsername) {
        navigate('/login');
        return;
      }
      const authorUsername = blog.authorUsername;
      if (!authorUsername) return;
      if (currentUsername === authorUsername) return;
      const url = following
        ? `/user/${authorUsername}/unfollow`
        : `/user/${authorUsername}/follow`;
      const res = await axiosInstance.post(url);
      setFollowing(!following);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        if (key) localStorage.removeItem(key);
        navigate('/login');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/u/${currentUser?.username}/edit-blog/${blog.blogId}`);
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !currentUser || !currentUser.id) return;
    setSubmitting(true);
    try {
      await axiosInstance.post(`/comment/${currentUser.id}/${blogId}/add-comment`, {
        content: newComment
      });

      setComments(prev => [
        {
          username: currentUser.username,
          name: currentUser.name,
          content: newComment,
          createdAt: new Date().toISOString()
        },
        ...prev
      ]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
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

        <div className="flex items-center space-x-6 mb-8">
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

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
          {isLoggedIn ? (
            <div className="mb-6">
              <textarea
                rows="3"
                className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                placeholder="Write something nice..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                disabled={submitting || !newComment.trim()}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Login to add a comment.</p>
          )}

          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <div className="space-y-0">
            {comments.map((comment, index) => (
              <div key={index}>
                <div className="py-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-medium">
                      {(comment.username || '?').charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">@{comment.username || 'unknown'}</span>
                        <span className="text-sm text-gray-500">• {comment.name || 'Anonymous'}</span>
                        <span className="text-sm text-gray-500">• {formatFullDateTime(comment.createdAt)}</span>
                      </div>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
                {index < comments.length - 1 && (
                  <hr className="border-t border-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogViewer;