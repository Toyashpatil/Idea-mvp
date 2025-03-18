import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  const [formData, setFormData] = useState({
    employeeId: "",
    password: "",
  });
  const [currentTime, setCurrentTime] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Update system time continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include", // Enables sending cookies with the request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      alert("Login Successful!");
      navigate("/home"); // Redirect to dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg border border-gray-200 rounded">
        <img className="w-60 h-30 mx-auto" src={logo} alt="GenGuard Logo" />

        <div className="text-center text-gray-600">Current system time: {currentTime}</div>

        {error && <div className="text-red-600 text-sm text-center">{error}</div>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter your Employee ID"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
