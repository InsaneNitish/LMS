import mongoose from "mongoose";

const borrowerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    phone: {
        type: String,
        maxlength: 10
    },
    libraryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Library',
        required : true,
    }
});

export const Borrower = mongoose.model('Borrower', borrowerSchema);
