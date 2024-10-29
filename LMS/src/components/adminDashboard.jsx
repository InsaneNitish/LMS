// src/components/AdminDashboard.jsx
import React from 'react';
import { AiOutlineBook, AiOutlineUserAdd, AiOutlineSetting } from 'react-icons/ai';
import { MdLibraryBooks } from 'react-icons/md';
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const buttons = [
    { label: "Add Books", icon: <AiOutlineBook className="text-3xl" />, route: "/addBook" },
    { label: "Manage Users", icon: <AiOutlineUserAdd className="text-3xl" />, route: "/manageUsers" },
    { label: "Library Details", icon: <MdLibraryBooks className="text-3xl" />, route: "/libraryDetails" },
    { label: "Logout", icon: <IoLogOutOutline className="text-3xl" />, route: "/adminLogin", isLogout: true },
  ];

  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    toast.error("Access Denied! Login using correct Credentials.");
    setTimeout(() => {
      navigate("/adminLogin");
    }, 2000);
  } else {
    toast.success("Welcome Admin!");
  }

  const handleButtonClick = (route, isLogout) => {
    if (isLogout) {
      // Clear the token on logout
      localStorage.removeItem("adminToken");
      toast.success("Logged out successfully!");
    }
    navigate(route);
  };

  return (
    <div className="p-6">
      <Toaster />
      <h2 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {buttons.map((button, index) => (
          <div
            key={index}
            className={`p-8 rounded-lg flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer ${
              button.isLogout
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gradient-to-r from-blue-500 to-indigo-500"
            }`}
            onClick={() => handleButtonClick(button.route, button.isLogout)}
          >
            {button.icon}
            <span className="mt-4 text-xl font-semibold text-white">{button.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
