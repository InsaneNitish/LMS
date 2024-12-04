import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import lms from "../assets/lms (2).png"

const LibraryDetails = () => {
  const [library, setLibrary] = useState(null);
  const libraryId = localStorage.getItem("libraryId");

  useEffect(() => {
    axios
      .post(`http://localhost:8080/api/library/details`, {
        libraryId: libraryId,
      })
      .then((response) => {
        setLibrary(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [libraryId]); // Add dependency to prevent infinite re-renders

  if (!library) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-4">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={lms}
            alt="Library Image"
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">
            {library.name}
          </h1>
          <p className="text-sm text-gray-500 mb-4">{library.address}</p>
          <p className="text-gray-700">{library.description}</p>
          <div className="mt-4">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryDetails;
