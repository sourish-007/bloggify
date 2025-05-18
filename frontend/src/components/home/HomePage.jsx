import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios.js';
import Navbar from './homepagecomponents/Navbar.jsx';
import Sidebar from './homepagecomponents/sidebar/Sidebar.jsx';
import Footer from './homepagecomponents/Footer.jsx';
import TypewriterEffect from './homepagecomponents/TypewriterEffect.jsx';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [recent, setRecent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axiosInstance.get('/blog/featured')
      .then(res => setFeatured(res.data.data || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance.get('/blog', { params: { page, limit: 4 } })
      .then(res => {
        setRecent(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [page]);

  const renderPageButtons = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-4 py-2 border text-sm font-medium ${page === i + 1 ? 'bg-blue-500 text-white' : ''}`}
        >
          {i + 1}
        </button>
      ));
    }

    const buttons = [];
    buttons.push(
      <button key={1} onClick={() => setPage(1)} className={`px-4 py-2 border text-sm font-medium ${page === 1 ? 'bg-blue-500 text-white' : ''}`}>1</button>
    );
    if (page > 3) {
      buttons.push(<span key="start-ellipsis" className="px-4 py-2">…</span>);
    }
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-4 py-2 border text-sm font-medium ${page === i ? 'bg-blue-500 text-white' : ''}`}
        >
          {i}
        </button>
      );
    }
    if (page < totalPages - 2) {
      buttons.push(<span key="end-ellipsis" className="px-4 py-2">…</span>);
    }
    buttons.push(
      <button key={totalPages} onClick={() => setPage(totalPages)} className={`px-4 py-2 border text-sm font-medium ${page === totalPages ? 'bg-blue-500 text-white' : ''}`}>{totalPages}</button>
    );
    return buttons;
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen flex flex-col`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
            <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Discover ideas that </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">shape the future</span>
            </h1>
            <p className="mt-4 text-lg">
              Join our community of passionate tech enthusiasts, developers, and creative minds.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#featured" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md">Featured</a>
              <a href="#recent" className={darkMode ? 'px-6 py-3 bg-gray-700 text-gray-100 rounded-md' : 'px-6 py-3 bg-white text-gray-700 rounded-md shadow'}>Recent</a>
            </div>
          </div>
          <div className="relative h-64 sm:h-72 md:h-96 lg:h-full">
            <TypewriterEffect darkMode={darkMode} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 lg:grid lg:grid-cols-3 lg:gap-8 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="lg:col-span-2 space-y-12">
          <section id="featured">
            <h2 className="text-2xl font-bold mb-4">Featured Posts</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {featured.map(post => (
                <div key={post.blogId} className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <Link to={`/b/${post.blogId}`}><h3 className="text-xl font-semibold mb-2 hover:text-blue-600">{post.title}</h3></Link>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-3 mb-4`}>{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-red-500">❤</span>
                      <span>{post.likes || 0}</span>
                    </div>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="recent">
            <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
            {isLoading ? (
              <div className="space-y-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`h-32 rounded-lg ${darkMode ? 'bg-gray-800 animate-pulse' : 'bg-white shadow animate-pulse'}`} />
                ))}
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {recent.map(post => (
                    <div key={post.blogId} className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <Link to={`/b/${post.blogId}`}><h3 className="text-lg font-semibold mb-2 hover:text-blue-600">{post.title}</h3></Link>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-2`}>{post.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-red-500">❤</span>
                          <span>{post.likes || 0}</span>
                        </div>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <nav className="mt-8 flex justify-center space-x-2">
                  <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="px-3 py-1 border rounded-md">Prev</button>
                  {renderPageButtons()}
                  <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="px-3 py-1 border rounded-md">Next</button>
                </nav>
              </>
            )}
          </section>
        </div>

        <aside><Sidebar darkMode={darkMode} /></aside>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-50'} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to dive deeper?</h2>
          <p className="mb-6">Start your writing journey today and share your insights with the world.</p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md">Create Account</button>
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default HomePage;