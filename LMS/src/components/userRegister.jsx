import React, { useState } from "react";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get libraryId from localStorage
    const libraryId = localStorage.getItem("libraryId");

    if (!libraryId) {
      toast.error("Library ID not found. Please login again as admin to register a new user.")
      return;
    }

    // Add libraryId to form data
    const dataToSubmit = { ...formData, libraryId };

    const registerUser = async (data) => {
      try {
        await axios.post("http://localhost:8080/api/admin/addMembers", data);

        // Reset form on success
        setFormData({ name: "", email: "", password: "", phone: "" });
        toast.success("User registered successfully!")
      } catch (error) {
        console.error("Error registering user:", error);
        toast.error("Error registering user. Please try again.")
      }
    };

    registerUser(dataToSubmit);
  };

  return (
    <div className="flex justify-center items-center w-screen h-[90vh] bg-gray-100">
      <Toaster/>
      <div className="flex flex-row shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Image and Welcome Text */}
        <div className="flex items-center justify-center w-[40%] bg-gradient-to-b from-blue-500 to-indigo-600 text-white p-8 bg-image">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 ">Welcome to LMS</h2>
            <p className="text-lg">
              Register now to manage your library account effectively.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center items-center w-[60%] bg-white p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Enter User Details
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            {["name", "email", "password", "phone"].map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="font-semibold mb-1" htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}*
                </label>
                <input
                  type={
                    field === "email"
                      ? "email"
                      : field === "password"
                      ? "password"
                      : "text"
                  }
                  name={field}
                  required
                  placeholder={`Enter your ${field}`}
                  value={formData[field]}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full px-6 py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
