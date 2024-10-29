import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    reservationID: {
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
    reservationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    }
});

export const Reservation = mongoose.model('Reservation', reservationSchema);
