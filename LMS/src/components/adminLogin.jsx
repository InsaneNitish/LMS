// src/components/AdminLogin.jsx

import React, { useState } from 'react';
import axios from 'axios';
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import lms from "../assets/lms.jpg";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/admin/login', credentials);
      toast.success('Logged in successfully');
      localStorage.setItem('adminToken',response.data.token)
      // Redirect to the Admin Dashboard after successful login
      navigate("/adminDashboard");
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-[90vh] bg-gray-100">
      <Toaster position="top-right" />
      <div className="flex flex-row shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side - Image and Text */}
        <div className="flex items-center justify-center w-[40%] bg-gradient-to-b from-blue-500 to-indigo-600 text-white p-8 bg-image">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Admin Login</h2>
            <p className="text-lg">Login to access library management resources and tools.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center items-center w-[60%] bg-white p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Login</h1>
          <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1" htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1" htmlFor="password">Password*</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
