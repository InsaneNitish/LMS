import { Admin } from "../models/admin.js";
import { Borrower } from "../models/borrower.js";
import { Transaction } from "../models/transaction.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Reservation } from "../models/reservation.js";

dotenv.config();

// Admin registration controller
export const adminRegister = async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    console.log(newAdmin);
    await newAdmin.save();
    res.status(200).json(newAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Admin login controller
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(404).json({
        msg: "No Admin with this email found. Check Your Credentials.",
      });
    } else {
      if (password !== admin.password) {
        return res.status(401).json({ msg: "Password is incorrect!" });
      } else {
        const token = jwt.sign({ email: email }, process.env.SECRETKEY, {
          expiresIn: "1h",
        });
        // Respond with token and admin details
        res.status(200).json({
          id: admin._id,
          email: admin.email,
          libraryId: admin.libraryId,
          token: token,
        });
      }
    }
  } catch (error) {
    console.error("Login error:", error); // Log the error to understand the issue
    res.status(500).json({ msg: "Server error during login" });
  }
};

// Fetch admin details controller with logging
export const adminFetchDetails = async (req, res) => {
  const { id } = req.body;
  if (id) {
    const admin = await Admin.findById(id); // Ensure correct access to ID
    res.status(200).json(admin);
  } else {
    res.status(401).json({ msg: "Admin not logged in" });
  }
};

//add members to the library
export const addMembers = async (req, res) => {
  try {
    const { name, email, password, phone, libraryId } = req.body;
    const existingUser = await Borrower.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const user = new Borrower({
      name,
      email,
      password,
      phone,
      libraryId,
    });
    await user.save();
    res.status(201).json({ msg: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

//get all members with details
export const getMembers = async (req, res) => {
  try {
    const libraryId = req.body.libraryId;
    const members = await Borrower.find({ libraryId: libraryId });
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

//get a memeber using id
export const getMemberById = async (req, res) => {
  try {
    const { borrowerId } = req.body;
    const member = await Borrower.findById({ _id: borrowerId });
    const dataToSend = {
      name: member.name,
      email: member.email,
      phone: member.phone,
    };
    res.status(200).json(dataToSend);
  } catch (error) {
    console.error("Server error occcured.", error);
    res
      .status(500)
      .json({ msg: "Server occured while fetching user details." });
  }
};

//get all list of reservation of users
export const getReservations = async (req, res) => {
  try {
    const libraryId = req.body.libraryId;
    const reservations = await Reservation.find({ libraryId: libraryId });
    if (!reservations) {
      return res.status(404).json({ msg: "No reservations found" });
    } else {
      res.status(200).json(reservations);
    }
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

//approve or reject a reservation
export const approveRejectReservation = async (req, res) => {
  try {
    const { approve, disprove, borrowerId, bookId } = req.body;
    const reservation = await Reservation.findOne({
      borrowerId: borrowerId,
      bookId: bookId,
    });
    if (!reservation) {
      return res.status(404).json({ msg: "No reservation found" });
    }
    if (approve) {
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 15);
      console.log(returnDate);
      const transaction = new Transaction({
        borrowerId: borrowerId,
        bookId: bookId,
        returnDate : returnDate,
        borrowDate: new Date(),
        fine: 0,
      });
      await transaction.save();
      reservation.status = "Completed";
      await reservation.save();
      return res.status(200).json({ msg: "Reservation approved" });
    }
    if (disprove) {
      reservation.status = "Rejected";
      await reservation.save();
      return res.status(200).json({ msg: "Reservation rejected" });
    }
  } catch (error) {
    console.error("Error approving/rejecting reservation:", error);
    res
      .status(500)
      .json({ msg: "Error in approving/rejecting the reservatiob request." });
  }
};
