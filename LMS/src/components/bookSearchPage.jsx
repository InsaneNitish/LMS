import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const BookSearchPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
  });
  const [libraryId, setLibraryId] = useState("");
  const [borrowerId, setBorrowerId] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  // Fetch libraryId and borrowerId from localStorage on component mount
  useEffect(() => {
    const storedLibraryId = localStorage.getItem("libraryId");
    const storedBorrowerId = localStorage.getItem("borrowerId");
    if (storedLibraryId) setLibraryId(storedLibraryId);
    if (storedBorrowerId) setBorrowerId(storedBorrowerId);
    if (!storedLibraryId || !storedBorrowerId) {
      setError("Missing library or borrower information. Please log in again.");
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to search for books
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBooks([]);

    if (!libraryId) {
      setError("Library ID is required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/book/search",
        {
          ...formData,
          libraryId,
        }
      );
      setBooks(response.data.books);
    } catch (err) {
      setError("Error searching books. Please try again.");
      console.error(err);
    }
  };

  // Handle book reservation
  const handleReserveBook = async (bookId) => {
    if (!libraryId || !borrowerId) {
      toast.error("Library or Borrower ID missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/book/reservation",
        {
          libraryId,
          borrowerId,
          bookId,
        }
      );
      toast.success(
        `${response.data.message}`
      );
    } catch (err) {
      toast.error("An error occurred while reserving the book.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-center mb-6">
        Search and Reserve Books
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            placeholder="Enter book title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-medium">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            placeholder="Enter author name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            placeholder="Enter book category"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
        >
          Search
        </button>
      </form>

      {books.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {books.map((book) => (
              <div
                key={book._id}
                className="p-4 border rounded-lg shadow-md bg-white"
              >
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-gray-700">Author: {book.author}</p>
                <p className="text-gray-700">Category: {book.category}</p>
                <button
                  onClick={() => handleReserveBook(book._id)}
                  className="mt-2 py-1 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
                >
                  Reserve
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearchPage;
