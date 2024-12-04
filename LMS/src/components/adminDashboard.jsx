// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineBook,
  AiOutlineUserAdd,
  AiOutlineSetting,
  AiFillSnippets,
} from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import Sidebar from "./sidebar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import BackButton from "./backButton";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [adminData, setAdminData] = useState({});
  const [textIndex, setTextIndex] = useState(0);

  const messages = [
    "Welcome to Your Dashboard!",
    "Manage Your Library Efficiently!",
    "Add Books and Users Easily",
    "Personalize Your Settings",
    "You're Making a Difference!",
  ];

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminId = localStorage.getItem("adminId");
        if (!adminId) {
          toast.error("Admin ID not found. Please login again.");
          navigate("/adminLogin");
          return;
        }
        const adminResponse = await axios.post(
          "http://localhost:8080/api/admin/details",
          { id: adminId }
        );
        setAdminData(adminResponse.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();

    // Text rotation
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const buttons = [
    {
      label: "Manage Books",
      icon: <AiOutlineBook className="text-2xl" />,
      route: "manageBooks",
    },
    {
      label: "Manage Users",
      icon: <AiOutlineUserAdd className="text-2xl" />,
      route: "manageUsers",
    },
    {
      label: "Library Details",
      icon: <MdLibraryBooks className="text-2xl" />,
      route: "libraryDetails",
    },
    {
      label: "Settings",
      icon: <AiOutlineSetting className="text-2xl" />,
      route: "settings",
    },
    {
      label: "Pending Reservations",
      icon: <AiFillSnippets className="text-2xl" />,
      route: "bookReservation",
    },
    {
      label: "Logout",
      icon: <IoLogOutOutline className="text-2xl" />,
      route: "/adminLogin",
      isLogout: true,
    },
  ];

  const profile = {
    name: adminData.name,
    email: localStorage.getItem("email") || "admin@example.com",
    avatar: "https://via.placeholder.com/80",
  };

  const handleButtonClick = async (route, isLogout) => {
    if (isLogout) {
      localStorage.clear();
      toast.success(`Logged out successfully!`);
      navigate(route);
    } else {
      navigate(`/${route}`);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Toaster />
      <BackButton/>
      {/* Sidebar Component */}
      <Sidebar
        buttons={buttons}
        profile={profile}
        activeRoute={location.pathname}
        onClick={handleButtonClick}
      />

      {/* Main Content Area with Animated Section */}
      <div className="flex-1 bg-gray-100 overflow-hidden relative">
        <div className="animated-content flex flex-col items-center justify-center h-full">
          <h1 className="animated-text">{messages[textIndex]}</h1>

          {/* Floating Shapes */}
          <div className="floating-shapes">
            <div className="floating-box circle"></div>
            <div className="floating-box circle1"></div>
            <div className="floating-box circle2"></div>
            <div className="floating-box square"></div>
            <div className="floating-box rectangle"></div>
            <div className="floating-box triangle"></div>
            <div className="floating-box oval"></div>
            <div className="floating-box pentagon"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
