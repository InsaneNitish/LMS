import express from "express";
import { adminRegister } from "../controller/adminController.js";
import { adminLogin } from "../controller/adminController.js";

const adminRouter  = express.Router()

adminRouter.route("/register").post(adminRegister)
adminRouter.route('/login').post(adminLogin)

export default adminRouter