import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './routes/login/login'
import Register from "./routes/register/register";
import Library from "./routes/library/library";
import userServices from './services/user'
import "./App.css"

const BASE_URL = 'http://localhost:8080'

const App = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await userServices.getUser();
          setUserDetails(userData);
        } catch (error) {
          console.error('Token invalid:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    setUserDetails(null);
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            userDetails ? (
              <Navigate to="/library" replace />
            ) : (
              <Login setUserDetails={setUserDetails} />
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            userDetails ? (
              <Navigate to="/library" replace />
            ) : (
              <Register setUserDetails={setUserDetails} />
            )
          } 
        />
        <Route 
          path="/library" 
          element={
            userDetails ? (
              <Library user={userDetails} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App