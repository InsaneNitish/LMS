import React, { useState } from "react";

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic
  };

  return (
    <div className="flex justify-center items-center w-screen h-[90vh] bg-gray-100">
      <div className="flex flex-col shadow-lg rounded-lg overflow-hidden bg-white p-8 w-[50%]">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Search User</h1>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            placeholder="Enter user name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchUser;
