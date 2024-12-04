import {Book} from "../models/books.js"

export const addBooks =async (req,res)=>{
    try {
        // Extract data from req.body
        const {title, author, ISBN, category, publishedDate, copiesAvailable,libraryId } = req.body;

        // Create a new instance of the Book model
        const newBook = new Book({
            title,
            author,
            ISBN,
            category,
            publishedDate,
            copiesAvailable,
            libraryId
        });

        // Save the new book instance to the database
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully!', book: newBook });
    } catch (error) {
        console.error('Error saving book:', error);
        res.status(500).json({ message: 'Error adding book', error });
    }
};


export const getBooks = async (req,res)=>{
    try {
        const {libraryId} = req.body
        const books = await Book.find({libraryId:libraryId})
        res.status(200).json({books})
    } catch (error) {
        console.error('Error getting Books from Server',error);
        res.status(500).json({message : "Error getting books",error})
    }
}
