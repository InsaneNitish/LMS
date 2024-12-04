import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    borrowerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Borrower',
        required: true
    },
    libraryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Library',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    reservationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Rejected', 'Completed'],
        default: 'Pending'
    }
});

export const Reservation = mongoose.model('Reservation', reservationSchema);
