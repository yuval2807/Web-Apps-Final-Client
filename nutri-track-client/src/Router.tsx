import React from "react";
import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import Registration from "./views/Registration";
import TipsPage from "./views/TipsPage";
import Login from "./views/LoginPage";
import UserProfile from "./views/UserProfile";
import CreatePost from "./views/AddPostPage";
import PostsList from "./views/PostsPage";
import EditPost from "./views/EditPostPage";
import PageLayout from "./components/Common/PageLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/",
    element: <PageLayout />,
    loader: () => {
      const hasTokens =
        !!localStorage.getItem("refreshToken") &&
        !!localStorage.getItem("accessToken");

      if (!hasTokens) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");

        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "tips",
        element: <TipsPage />,
      },
      {
        index: true,
        element: <PostsList />,
      },
      {
        path: "post/create",
        element: <CreatePost />,
      },
      {
        path: "post/edit/:postid",
        element: <EditPost />,
      },
      {
        path: "userProfile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to='/' />,
  },
]);
