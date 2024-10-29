import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    bookID: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    author: {
        type: String,
        required: true,
        maxlength: 50
    },
    ISBN: {
        type: String,
        required: true,
        unique: true,
        maxlength: 13
    },
    category: {
        type: String,
        maxlength: 30
    },
    publishedDate: {
        type: Date,
    },
    copiesAvailable: {
        type: Number,
        required: true,
        min: 0
    }
});

export const Book = mongoose.model('Book', bookSchema);
