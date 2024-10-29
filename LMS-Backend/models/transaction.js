import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    transactionID: {
        type: String,
        required: true,
        unique: true
    },
    borrowerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Borrower',
        required: true
    },
    bookID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
    },
    fine: {
        type: Number,
        default: 0.0
    }
});

export const Transaction = mongoose.model('Transaction', transactionSchema);
