import React, { useState } from 'react';
import authContext from './authContext';

const AuthState = (props) => {
  const baseUrl = 'http://localhost:5000/auth';
  
  // Store token in state (also you can persist it in localStorage)
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([])

  // Health check API call
  const healthCheck = async () => {
    try {
      const res = await fetch(`${baseUrl}/health`);
      const data = await res.text();
      return data;
    } catch (error) {
      console.error("Health check error:", error);
      return "Error";
    }
  };

  // Register API call
  const register = async (userData) => {
    try {
      const res = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success && data.token) {
        setAuthToken(data.token);
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: error.message };
    }
  };

  // Login API call
  const login = async (credentials) => {
    try {
      const res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data.success && data.token) {
        setAuthToken(data.token);
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.message };
    }
  };

  // Logout function: clear token and user details
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
    setUser(null);
  };

  // Context value containing state and functions for all auth APIs
  const authContextValue = {
    authToken,
    user,
    setUser,
    healthCheck,
    register,
    login,
    logout,
  };

  return (
    <authContext.Provider value={authContextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
