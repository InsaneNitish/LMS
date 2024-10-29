import React, { useState } from 'react';
import axios from 'axios'; // to send POST request to your backend

const backendUrl = 'api/books'

const BookForm = () => {
    const [bookData, setBookData] = useState({
        bookID: '',
        title: '',
        author: '',
        ISBN: '',
        category: '',
        publishedDate: '',
        copiesAvailable: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the backend API to insert book data
            await axios.post(`http://localhost:8080/${backendUrl}/add`, bookData);
            alert('Book added successfully!');
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Failed to add book.');
        }
    };

    return (
        <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6">Add New Book</h2>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Book ID</label>
                <input
                    type="text"
                    name="bookID"
                    value={bookData.bookID}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                    type="text"
                    name="title"
                    value={bookData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Author</label>
                <input
                    type="text"
                    name="author"
                    value={bookData.author}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">ISBN</label>
                <input
                    type="text"
                    name="ISBN"
                    value={bookData.ISBN}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                <input
                    type="text"
                    name="category"
                    value={bookData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Published Date</label>
                <input
                    type="date"
                    name="publishedDate"
                    value={bookData.publishedDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Copies Available</label>
                <input
                    type="number"
                    name="copiesAvailable"
                    value={bookData.copiesAvailable}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Add Book
            </button>
        </form>
    );
};

export default BookForm;
