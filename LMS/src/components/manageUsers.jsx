// src/components/manageUsers.jsx
import React from "react";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-50 p-6">
      <div className="flex flex-col shadow-xl rounded-xl overflow-hidden bg-white p-10 w-full max-w-2xl">
        <h1 className="text-4xl font-semibold mb-8 text-gray-800 text-center border-b pb-4">
          Manage Users
        </h1>

        <div className="flex flex-col space-y-5">
          <Link
            to="/userRegister"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200 text-center text-lg font-medium"
          >
            Add a Member
          </Link>

          <Link
            to="/searchUsers"
            className="px-8 py-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-200 text-center text-lg font-medium"
          >
            Search for a Member
          </Link>

          <Link
            to="/userList"
            className="px-8 py-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition duration-200 text-center text-lg font-medium"
          >
            View All Members
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
