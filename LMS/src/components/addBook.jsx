// src/components/BookForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { FaBook, FaUser, FaBarcode, FaLayerGroup, FaCalendarAlt, FaCopy } from "react-icons/fa";
import BackButton from "./backButton.jsx"

const backendUrl = "http://localhost:8080/api/books";

const BookForm = () => {
  const libraryId = localStorage.getItem("libraryId");
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    ISBN: "",
    category: "",
    publishedDate: "",
    copiesAvailable: "",
    libraryId: libraryId,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/add`, bookData);
      toast.success("Book added successfully!");
      setBookData({
        title: "",
        author: "",
        ISBN: "",
        category: "",
        publishedDate: "",
        copiesAvailable: "",
        libraryId: libraryId,
      });
      setIsSubmitted(true);
      setError("");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book.");
      setError("Failed to add book.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100 p-4">
      <form
        className="max-w-lg w-full bg-white rounded-lg shadow-2xl p-8"
        onSubmit={handleSubmit}
      >
        <Toaster />
        <BackButton className="bg-blue-400"/>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Book
        </h2>

        {isSubmitted && (
          <p className="text-green-600 text-center mb-4">
            Book added successfully!
          </p>
        )}

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <div className="space-y-6">
          {[
            { label: "Title", name: "title", type: "text", icon: FaBook },
            { label: "Author", name: "author", type: "text", icon: FaUser },
            { label: "ISBN", name: "ISBN", type: "text", icon: FaBarcode },
            { label: "Category", name: "category", type: "text", icon: FaLayerGroup },
            { label: "Published Date", name: "publishedDate", type: "date", icon: FaCalendarAlt },
            { label: "Copies Available", name: "copiesAvailable", type: "number", icon: FaCopy },
          ].map((field) => (
            <div key={field.name} className="relative">
              <label className="block text-gray-500 font-semibold mb-1">{field.label}</label>
              <div className="flex items-center">
                <field.icon className="text-gray-400 absolute left-3" size={18} />
                <input
                  type={field.type}
                  name={field.name}
                  value={bookData[field.name]}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required={field.name !== "category"}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-md hover:from-blue-600 hover:to-purple-600 shadow-lg transition duration-200 transform hover:scale-105"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;
