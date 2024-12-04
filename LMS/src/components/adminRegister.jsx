// src/components/AdminRegister.jsx

import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: '', email: '', password: '' };

    if (!formData.name) {
      newErrors.name = 'Name is required.';
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid.';
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const libraryId = localStorage.getItem('lib_id');
    if (!libraryId) {
      toast.error("No library selected. Please create a library first.");
      setTimeout(() => {
        navigate('/createLibrary');
      }, 2000);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/admin/register', {
        ...formData,
        libraryId,
      });

      toast.success("Admin registered successfully!");
      setFormData({ name: '', email: '', password: '' });
      localStorage.removeItem('lib_id');
      navigate('/adminLogin');
    } catch (error) {
      toast.error("Error registering admin.");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-[90vh] bg-gray-100">
      <Toaster position="top-right" />

      <div className="flex flex-row shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side - Image and Text */}
        <div className="flex items-center justify-center w-[40%] bg-gradient-to-b from-blue-500 to-indigo-600 text-white p-8 bg-image">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Enter Admin Details for your Library</h2>
            <p className="text-lg">Fill in the details correctly.</p>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex flex-col justify-center items-center w-[60%] bg-white p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Registration</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1" htmlFor="name">Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1" htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1" htmlFor="password">Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Register Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
