// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineMenu,
  AiOutlineClose,
  AiFillBook,
  AiFillDashboard,
  AiFillProfile,
} from "react-icons/ai";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const setUser = () => {
      // Check if an admin or user is logged in
      const adminId = localStorage.getItem("adminId");
      const borrowerId = localStorage.getItem("borrowerId");

      if (adminId) {
        setIsAdminLoggedIn(true);
        setLoggedInUser(localStorage.getItem("adminEmail") || "Admin");
      } else if (borrowerId) {
        setIsUserLoggedIn(true);
        setLoggedInUser(localStorage.getItem("userEmail") || "User");
      }
    };

    setUser();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    if (isAdminLoggedIn) {
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("libraryId");
      navigate("/adminLogin");
    } else if (isUserLoggedIn) {
      localStorage.removeItem("borrowerId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userToken");
      localStorage.removeItem("libraryId");
      navigate("/userLogin");
    }
    setIsAdminLoggedIn(false);
    setIsUserLoggedIn(false);
  };

  return (
    <nav className="bg-image shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and LMS Title */}
        <Link to="/" className="flex items-center space-x-2 text-white">
          <AiFillBook className="text-3xl" />
          <h1 className="font-bold text-2xl tracking-wide">LMS</h1>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link
              to="/"
              className="flex items-center text-white font-medium hover:text-yellow-300 transition-colors duration-300"
            >
              <AiFillHome className="mr-2 text-xl" />
              Home
            </Link>
          </li>
          {(isAdminLoggedIn || isUserLoggedIn) && (
            <li>
              <Link
                to={isAdminLoggedIn ? "/adminDashboard" : "/userDashboard"}
                className="flex items-center text-white font-medium hover:text-yellow-300 transition-colors duration-300"
              >
                <AiFillDashboard className="mr-2 text-xl" />
                Dashboard
              </Link>
            </li>
          )}
          {(isAdminLoggedIn || isUserLoggedIn) && (
            <li className="flex items-center text-white font-medium">
              <AiFillProfile className="mr-2 text-xl" />
              <span>{loggedInUser}</span>
            </li>
          )}
          {(isAdminLoggedIn || isUserLoggedIn) && (
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 font-medium hover:underline transition-colors duration-300"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-600 text-white space-y-4 py-6">
          <Link
            to="/"
            onClick={toggleMobileMenu}
            className="flex items-center justify-center font-medium hover:text-yellow-300 transition-colors duration-300"
          >
            <AiFillHome className="mr-2 text-xl" />
            Home
          </Link>
          {(isAdminLoggedIn || isUserLoggedIn) && (
            <Link
              to={isAdminLoggedIn ? "/adminDashboard" : "/userDashboard"}
              onClick={toggleMobileMenu}
              className="flex items-center justify-center font-medium hover:text-yellow-300 transition-colors duration-300"
            >
              <AiFillDashboard className="mr-2 text-xl" />
              Dashboard
            </Link>
          )}
          {(isAdminLoggedIn || isUserLoggedIn) && (
            <div className="flex flex-col items-center font-medium">
              <AiFillProfile className="text-xl" />
              <span>{loggedInUser}</span>
            </div>
          )}
          {(isAdminLoggedIn || isUserLoggedIn) && (
            <button
              onClick={() => {
                toggleMobileMenu();
                handleLogout();
              }}
              className="text-red-500 font-medium hover:underline transition-colors duration-300"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
