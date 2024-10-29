import React from "react";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  return (
    <div className="flex justify-center items-center w-screen h-[90vh] bg-gray-100">
      <div className="flex flex-col shadow-lg rounded-lg overflow-hidden bg-white p-8 w-[60%]">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h1>
        
        <div className="flex flex-col space-y-4">
          <Link 
            to="/userRegister"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-center"
          >
            Add a Member
          </Link>
          
          <Link 
            to="/searchUsers"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 text-center"
          >
            Search for a Member
          </Link>
          
          <Link 
            to="/userList"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 text-center"
          >
            View All Members
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
