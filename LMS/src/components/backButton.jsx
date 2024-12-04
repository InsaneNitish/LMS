// src/components/BackButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const BackButton = ({ label = "", className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center text-white hover:bg-blue-600 rounded-md shadow-md transition duration-300 ease-in-out ${className} absolute top-[10%] left-2 rounded-[50%] w-[40px] h-[40px]`}
    >
      <AiOutlineArrowLeft className="text-[20px]" />
    </button>
  );
};

export default BackButton;
