import mongoose from "mongoose";

const fineSchema = new mongoose.Schema({
    fineID: {
        type: String,
        required: true,
        unique: true
    },
    borrowerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Borrower',
        required: true
    },
    transactionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    fineAmount: {
        type: Number,
        required: true
    },
    paidStatus: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        default: 'Unpaid'
    }
});

export const Fine = mongoose.model('Fine', fineSchema);
