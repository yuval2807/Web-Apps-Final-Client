import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./views/Registration";
import HomePage from "./views/HomePage";
import Login from "./views/LoginPage";
import UserProfile from "./views/UserProfile";
import CreatePost from "./views/AddPostPage";
import PostsList from "./views/PostsPage";
import EditPost from "./views/EditPostPage";

// Main App Component
const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/post" element={<PostsList />} />
      <Route path="/post/create" element={<CreatePost/>} />
      <Route path="/post/edit/:postid" element={<EditPost/>} />
    </Routes>
  );
};

export default Router;
