import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Registration from "./views/Registration";
import HomePage from "./views/HomePage";
import Login from "./views/LoginPage";

// Main App Component
const Router: React.FC = () => {
  const theme = createTheme();

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Registration />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/' element={<Navigate to='/login' replace />} />
    </Routes>
  );
};

export default Router;
