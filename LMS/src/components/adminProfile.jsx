// src/components/Settings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle, FaUniversity } from 'react-icons/fa';

const Settings = () => {
  const [adminData, setAdminData] = useState({});
  const [libraryData, setLibraryData] = useState({});

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminId = localStorage.getItem('adminId');
        const adminResponse = await axios.post('http://localhost:8080/api/admin/details', { id: adminId });
        setAdminData(adminResponse.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    const fetchLibraryData = async () => {
      try {
        const libraryId = localStorage.getItem('libraryId');
        const libraryResponse = await axios.post('http://localhost:8080/api/library/details', { libraryId: libraryId });
        setLibraryData(libraryResponse.data);
      } catch (error) {
        console.error('Error fetching library data:', error);
      }
    };

    fetchAdminData();
    fetchLibraryData();
  }, []);

  return (
    <div className="flex flex-row items-center justify-around min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-8 w-full">
      {/* Admin Profile Card */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-center mb-4 text-blue-500">
          <FaUserCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Admin Profile</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-gray-500 font-semibold">Name:</label>
            <p className="text-gray-900 text-lg font-medium">{adminData.name || 'N/A'}</p>
          </div>
          <div>
            <label className="text-gray-500 font-semibold">Email:</label>
            <p className="text-gray-900 text-lg font-medium">{adminData.email || 'N/A'}</p>
          </div>
          <div>
            <label className="text-gray-500 font-semibold">Library:</label>
            <p className="text-gray-900 text-lg font-medium">{adminData.library || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Library Details Card */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-4 text-indigo-500">
          <FaUniversity size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Library Details</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-gray-500 font-semibold">Library Name:</label>
            <p className="text-gray-900 text-lg font-medium">{libraryData.name || 'N/A'}</p>
          </div>
          <div>
            <label className="text-gray-500 font-semibold">Address:</label>
            <p className="text-gray-900 text-lg font-medium">{libraryData.address || 'N/A'}</p>
          </div>
          <div>
            <label className="text-gray-500 font-semibold">Description:</label>
            <p className="text-gray-900 text-lg font-medium">{libraryData.description || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
