import { userLogin,userReservation,bookSearch, getAllReservationStatus } from "../controller/userController.js";
import express from "express";

const userRouter  = express.Router()

userRouter.route("/login").post(userLogin)
userRouter.route("/book/reservation").post(userReservation)
userRouter.route("/book/search").post(bookSearch)
userRouter.route("/book/reservation/status").post(getAllReservationStatus)

export default userRouter

