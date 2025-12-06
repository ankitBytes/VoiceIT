import { CssBaseline, Container, Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TasksProvider } from "./context/TasksContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import Login from "./pages/login.jsx";
import Signup from "./pages/signupPage.jsx";
import ProtectedRoute from "./utils/protectedRoutes.jsx";
import HomePage from "./pages/homePage.jsx";
import PublicOnly from "./utils/publicOnly.jsx";

import { useState } from "react";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicOnly>
                <Login />
              </PublicOnly>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicOnly>
                <Signup />
              </PublicOnly>
            }
          />
          <Route
            index
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
