import React from "react";
import lms from "../assets/lms.jpg";

const UserRegister = () => {
  return (
    <div className="flex justify-center items-center w-screen h-[90vh] bg-gray-100">
      <div className="flex flex-row shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side - Image and Welcome Text */}
        <div className="flex items-center justify-center w-[40%] bg-gradient-to-b from-blue-500 to-indigo-600 text-white p-8 bg-image">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 ">Welcome to LMS</h2>
            <p className="text-lg">Register now to manage your library account effectively.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center items-center w-[60%] bg-white p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Enter User Details</h1>
          <form className="w-full max-w-sm space-y-4">
            {["ID Number", "Name", "Email", "Password", "Phone No."].map((label, index) => (
              <div key={index} className="flex flex-col">
                <label className="font-semibold mb-1" htmlFor={label.toLowerCase().replace(/ /g, "")}>
                  {label}*
                </label>
                <input
                  type={label === "Email" ? "email" : label === "Password" ? "password" : "text"}
                  name={label.toLowerCase().replace(/ /g, "")}
                  required
                  placeholder={`Enter your ${label}`}
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
