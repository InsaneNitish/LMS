import express from "express";
import { addBooks,getBooks } from "../controller/bookController.js";

const bookRouter = express.Router();

bookRouter.route('/add').post(addBooks);
bookRouter.route('/get/all').post(getBooks);

export default bookRouter

