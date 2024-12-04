// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ buttons, profile, activeRoute, onClick }) => {
  return (
    <div className="w-1/4 min-w-max bg-gray-800 text-white flex flex-col items-center py-6 space-y-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-2 mb-8">
        <img
          src={profile?.avatar || "https://via.placeholder.com/80"}
          alt="Admin Avatar"
          className="rounded-full w-20 h-20"
        />
        <h2 className="text-lg font-semibold">{profile?.name || "Admin Name"}</h2>
        <span className="text-gray-400 text-sm">{profile?.email || "admin@example.com"}</span>
      </div>

      {/* Sidebar Buttons */}
      <div className="flex flex-col w-full space-y-4">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => onClick(button.route, button.isLogout)}
            className={`flex items-center space-x-3 py-3 px-4 rounded-lg w-3/4 mx-auto 
              ${button.isLogout ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-600"} 
              ${activeRoute.endsWith(button.route) ? "bg-indigo-600" : ""}`}
          >
            {button.icon}
            <span className="text-sm font-medium">{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
