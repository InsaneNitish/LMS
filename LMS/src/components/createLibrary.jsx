import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import lms from "../assets/lms.jpg";
import BackButton from './backButton';

const CreateLibrary = () => {
  const [libraryData, setLibraryData] = useState({
    name: '',
    address: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLibraryData({
      ...libraryData,
      [name]: value,
    });
  };

  const handleLibrarySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/library/create', libraryData);
      setLibraryData({ name: '', address: '', description: '' });
      toast.success(`Library created successfully`);
      localStorage.setItem('lib_id', response.data._id);
      navigate("/adminRegister");
    } catch (error) {
      toast.error('Error creating library');
      console.log(error);
      
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-[90vh] bg-gray-100">
      <Toaster position="top-right" />
      <BackButton className='bg-blue-400'/>
      <div className="flex flex-row shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side - Image and Text */}
        <div className="flex items-center justify-center w-[40%] bg-gradient-to-b from-blue-500 to-indigo-600 text-white p-8 bg-image">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Library Creation</h2>
            <p className="text-lg">Fill in the details to create a new library in the system.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center items-center w-[60%] bg-white p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Library</h1>
          <form onSubmit={handleLibrarySubmit} className="w-full max-w-sm space-y-4">
            {["Library Name", "Library Address", "Library Description"].map((label, index) => (
              <div key={index} className="flex flex-col">
                <label className="font-semibold mb-1">{label}*</label>
                <input
                  type="text"
                  name={label.toLowerCase().replace(/ /g, "")}
                  value={libraryData[label.toLowerCase().replace(/ /g, "")]}
                  onChange={handleChange}
                  placeholder={`Enter ${label}`}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <button type="submit" className="w-full px-6 py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
              Create Library
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLibrary;
