// src/components/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken"); // Check for user token
  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;

      const featureCards = document.querySelectorAll(".feature-row");
      featureCards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (scrollDirection === "down" && cardTop < windowHeight - 100) {
          card.classList.add("fade-in");
          card.classList.remove("fade-out");
        } else if (scrollDirection === "up") {
          card.classList.remove("fade-in");
          card.classList.add("fade-out");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection]);

  return (
    <div className="bg-image bg-pattern">
      {/* Enhanced Hero Section */}
      <header className="hero-section bg-image">
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
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to the Library Management System
          </h1>
          <p className="hero-subtitle">
            Your efficient solution to manage books, users, and more.
          </p>
          <div className="hero-buttons">
            {adminToken ? (
              <Link to="/adminDashboard" className="button button-primary">
                Open Dashboard
              </Link>
            ) : userToken ? (
              <Link to="/userDashboard" className="button button-primary">
                Go to User Dashboard
              </Link>
            ) : (
              <>
                <Link to="/createLibrary" className="button button-primary">
                  + Create Library
                </Link>
                <Link to="/adminLogin" className="button button-secondary">
                  Admin Login
                </Link>
                <Link to="/userLogin" className="button button-secondary">
                  User Login
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Features</h2>
        <div className="features-container">
          {/* Feature Rows */}
          <div className="feature-row feature-1">
            <h3 className="feature-title">Manage Books</h3>
            <p className="feature-description">
              Easily add, edit, and remove books from your library.
            </p>
          </div>
          <div className="feature-row feature-2">
            <h3 className="feature-title">User Management</h3>
            <p className="feature-description">
              Control user access and manage user roles efficiently.
            </p>
          </div>
          <div className="feature-row feature-3">
            <h3 className="feature-title">Reporting</h3>
            <p className="feature-description">
              Generate reports on library usage and user activity.
            </p>
          </div>
          <div className="feature-row feature-4">
            <h3 className="feature-title">Notifications</h3>
            <p className="feature-description">
              Get alerts for overdue books and important updates.
            </p>
          </div>
          <div className="feature-row feature-5">
            <h3 className="feature-title">Search Functionality</h3>
            <p className="feature-description">
              Quickly search for books and users in your library.
            </p>
          </div>
          <div className="feature-row feature-6">
            <h3 className="feature-title">Analytics</h3>
            <p className="feature-description">
              Analyze library trends and user engagement data.
            </p>
          </div>
          {/* Additional feature rows... */}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="flex justify-center items-center h-16 bg-gray-200 text-gray-600">
        <p>
          © {new Date().getFullYear()} Library Management System. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
