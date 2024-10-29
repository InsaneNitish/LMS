// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import AdminRegister from './createLibrary';

const Home = () => {

  // check if admin is logged in already.
  const adminToken = localStorage.getItem("adminToken")
  if (adminToken) {
    return(
      <div className='flex justify-center items-center flex-col min-h-[200px]'>
        <h1 className='text-3xl font-bold px-6 py-4'>Welcome, Admin!</h1>
        <Link to="/adminDashboard" className='p-5 m-10 bg-blue-600 text-xl font-semibold text-white rounded-sm hover:bg-blue-800 transition-all'>Open Dashboard</Link>
      </div>
    )
  }

  return (
    <div className="p-6 h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 relative">
      {/* Patterned Background */}
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      
      {/* Typing Animation Text */}
      <h2 className="text-3xl font-bold text-center mb-4">
        <span className="animate-typing whitespace-nowrap overflow-hidden inline-block border-r-2 border-gray-700 pr-2">
          Welcome to the Library Management System
        </span>
      </h2>

      {/* Subtitle */}
      <p className="mt-2 text-center text-gray-600">
        Manage your books, users, and more efficiently.
      </p>

      {/* Centered "Create Library" Button */}
      <button className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-full font-medium text-lg hover:bg-blue-700 transform transition duration-300 ease-in-out">
        <Link to={"/createLibrary"}>+ Create Library</Link>
      </button>
      <button className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-full font-medium text-lg hover:bg-blue-700 transform transition duration-300 ease-in-out">
        <Link to={"/adminLogin"}>Login</Link>
      </button>
    </div>
  );
};

export default Home;
