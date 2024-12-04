import { Borrower } from "../models/borrower.js";
import { Reservation } from "../models/reservation.js";
import {Book} from "../models/books.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// user Login Controller
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Borrower.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Accoutn with this email does not exist." });
    } else {
      if (password === user.password) {
        const token = jwt.sign({ email: email }, process.env.SECRETKEY, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          message: "Login Successfull",
          userId: user._id,
          libraryId: user.libraryId,
          email: email,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Invalid Password" });
      }
    }
  } catch (error) {
    console.error("Error in logging in user.", error);
    res.status(500).json({ message: "Error in logging in user.", error });
  }
};

//user reservation for a book
export const userReservation = async (req, res) => {
  try {
    const { bookId, borrowerId, libraryId } = req.body;
    //checking id there is a reswervation already for this same book by same user.
    const reservation = await Reservation.findOne({
      bookId: bookId,
      borrowerId: borrowerId,
    });
    if (reservation) {
      res.status(400).json({ message: "You have already reserved this book." });
    } else {
      const reserve = new Reservation({ bookId, borrowerId, libraryId });
      const savedReservation = await reserve.save();
      res
        .status(200)
        .json({ message: "Reservation Successfull", savedReservation });
    }
  } catch (error) {
    console.error("Error in reserving book.", error);
    res.status(500).json({ message: "Error in reserving book.", error });
  }
};

//book search by user
export const bookSearch = async (req, res) => {
  try {
    const { title, author, category, libraryId } = req.body;

    // Initialize an empty query object
    const query = { libraryId };

    // Add conditions to the query only if the corresponding field is provided
    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive regex search for title
    }
    if (author) {
      query.author = { $regex: author, $options: "i" }; // Case-insensitive regex search for author
    }
    if (category) {
      query.category = { $regex: category, $options: "i" }; // Case-insensitive regex search for category
    }

    // Execute the query
    const books = await Book.find(query);

    // Respond with the result
    res.status(200).json({ message: "Books found", books });
  } catch (error) {
    console.error("Error in searching book.", error);
    res.status(500).json({ message: "An error occurred while searching for books." });
  }
};


//get all reservation status
export const getAllReservationStatus = async (req, res) => {
  try {
    const {borrowerId} = req.body
    const reservations = await Reservation.find({borrowerId: borrowerId});
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error in getting all reservation status.", error);
    res.status(500).json({ message: "An error occurred while getting all reservation status." });
  }
};