// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineMenu, AiOutlineClose, AiFillBook } from 'react-icons/ai';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Home Link */}
        <Link to="/" className="flex items-center space-x-2 text-white">
          <AiFillBook className="text-3xl" />
          <h1 className="font-bold text-2xl tracking-wide">LMS</h1>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/" className="text-white font-medium hover:text-yellow-300 transition-colors duration-300">
              Home
            </Link>
          </li>
          
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white text-2xl focus:outline-none">
            {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-600 text-white space-y-4 py-6">
          <Link to="/" onClick={toggleMobileMenu} className="block text-center font-medium hover:text-yellow-300 transition-colors duration-300">
            Home
          </Link>
          <Link to="/adminDashboard" onClick={toggleMobileMenu} className="block text-center font-medium hover:text-yellow-300 transition-colors duration-300">
            Dashboard
          </Link>
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;
