import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/home/HomePage.jsx';
import LoginSignupPage from './components/loginsignup/LoginSignupPage.jsx';
import BlogViewer from './components/blog/BlogViewer.jsx';
import ProfilePage from './components/dropdowns/ProfilePage.jsx';
import MyBlogs from './components/dropdowns/MyBlogs.jsx';
import CreateBlog from './components/dropdowns/CreateBlog.jsx';
import EditBlog from './components/dropdowns/EditBlog.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginSignupPage loginMode={true} />} />
        <Route path="/signup" element={<LoginSignupPage loginMode={false} />} />

        <Route path="/b/:blogId" element={<BlogViewer />} />

        <Route
          path="/u/:username"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/u/:username/blogs"
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/u/:username/create-blog"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/u/:username/edit/:blogId"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/u/:username/edit-blog/:blogId"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;