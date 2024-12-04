import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    borrowerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Borrower',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowDate: {
        type: Date,
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
