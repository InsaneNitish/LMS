import {Book} from "../models/books.js"

export const addBooks =async (req,res)=>{
    try {
        // Extract data from req.body
        const { bookID, title, author, ISBN, category, publishedDate, copiesAvailable } = req.body;

        // Create a new instance of the Book model
        const newBook = new Book({
            bookID,
            title,
            author,
            ISBN,
            category,
            publishedDate,
            copiesAvailable
        });

        // Save the new book instance to the database
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully!', book: newBook });
    } catch (error) {
        console.error('Error saving book:', error);
        res.status(500).json({ message: 'Error adding book', error });
    }
};
