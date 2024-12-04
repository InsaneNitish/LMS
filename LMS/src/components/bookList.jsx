// src/components/BookList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null); // Track which row is expanded
  const [editingBook, setEditingBook] = useState(null);
  const [updatedBook, setUpdatedBook] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    visible: false,
    bookId: null,
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const libraryId = localStorage.getItem("libraryId");
        if (!libraryId) {
          toast.error("Library ID not found. Please login again.");
          return;
        }
        const response = await axios.post(
          "http://localhost:8080/api/books/get/all",
          { libraryId }
        );
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    setEditingBook(book._id);
    setUpdatedBook({ ...book });
  };

  const handleSave = async (bookId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/books/updateBook/${bookId}`,
        updatedBook
      );
      toast.success("Book updated successfully!");
      setEditingBook(null);
      setBooks(books.map((book) => (book._id === bookId ? updatedBook : book)));
    } catch (error) {
      toast.error("Error updating book.");
      console.error(error);
    }
  };

  const handleDeleteClick = (bookId) => {
    setDeleteConfirmation({ visible: true, bookId });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/books/deleteBook/${deleteConfirmation.bookId}`
      );
      toast.success("Book deleted successfully!");
      setBooks(books.filter((book) => book._id !== deleteConfirmation.bookId));
      setDeleteConfirmation({ visible: false, bookId: null });
    } catch (error) {
      toast.error("Error deleting book.");
      console.error(error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ visible: false, bookId: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const toggleRow = (bookId) => {
    setExpandedRow(expandedRow === bookId ? null : bookId);
  };

  return (
    <div className="flex justify-center items-center w-screen bg-gray-100 min-h-screen relative">
      <Toaster />
      <div className="flex flex-col shadow-lg rounded-lg overflow-hidden bg-white p-8 w-[80%]">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Book List</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4 text-left">Title</th>
              <th className="border-b p-4 text-left">Author</th>
              <th className="border-b p-4 text-left">Category</th>
              <th className="border-b p-4 text-center">Actions</th>
              <th className="border-b p-4 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <React.Fragment key={book._id}>
                {/* Main Row */}
                <tr
                  className="hover:bg-gray-50"
                  onClick={() => toggleRow(book._id)}
                >
                  <td className="border-b p-4">{book.title}</td>
                  <td className="border-b p-4">{book.author}</td>
                  <td className="border-b p-4">{book.category}</td>
                  <td className="border-b p-4 text-center">
                    {editingBook === book._id ? (
                      <button
                        onClick={() => handleSave(book._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(book)}
                        className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                      >
                        <FaEdit />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteClick(book._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td className="border-b p-4 text-center">
                    <button className="text-gray-500">
                      {expandedRow === book._id ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </td>
                </tr>

                {/* Expanded Details Row */}
                {expandedRow === book._id && (
                  <tr className="bg-gray-50">
                    <td colSpan="5" className="p-4">
                      <div className="flex flex-col space-y-2">
                        <div>
                          <strong>Copies Available:</strong>{" "}
                          {book.copiesAvailable || "N/A"}
                        </div>
                        <div>
                          <strong>Published Date:</strong>{" "}
                          {book.publishedDate || "N/A"}
                        </div>
                        <div>
                          <strong>ISBN:</strong> {book.ISBN || "N/A"}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.visible && (
        <div className="absolute bottom-4 w-[80%] bg-white p-4 shadow-lg rounded-md border border-gray-200 flex justify-between items-center">
          <p className="text-gray-700">
            Are you sure you want to delete this book?
          </p>
          <div>
            <button
              onClick={confirmDelete}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={cancelDelete}
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
