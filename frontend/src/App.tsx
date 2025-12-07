import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./services/auth";

function Nav() {
  const { token, logout } = useAuth();
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/">CyberSafe</Link>
      </div>
      <div className="nav-right">
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="btn-ghost">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Nav />
        <main className="main">
          <Routes>
            <Route path="/" element={<div className="home">Welcome to CyberSafe — learn safe internet practices.</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
