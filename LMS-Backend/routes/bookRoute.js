import express from "express";
import { addBooks } from "../controller/bookController.js";

const bookRouter = express.Router();

bookRouter.route('/add').post(addBooks);

export default bookRouter

