import express from "express";
import { addMembers, adminRegister, approveRejectReservation, getMemberById, getMembers } from "../controller/adminController.js";
import { adminLogin } from "../controller/adminController.js";
import { adminFetchDetails } from "../controller/adminController.js";
import { getReservations } from "../controller/adminController.js";

const adminRouter  = express.Router()

adminRouter.route("/register").post(adminRegister)
adminRouter.route('/login').post(adminLogin)
adminRouter.route('/details').post(adminFetchDetails)
adminRouter.route('/addMembers').post(addMembers)
adminRouter.route('/getMembers').post(getMembers)
adminRouter.route('/getReservations').post(getReservations)
adminRouter.route('/approveRejectReservation').post(approveRejectReservation)
adminRouter.route('/getMemberById').post(getMemberById)

export default adminRouter