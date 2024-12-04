import express from "express";
import { addLibrary,getDetails } from "../controller/libraryController.js";

const Libraryrouter = express.Router();

Libraryrouter.route('/create').post(addLibrary)
Libraryrouter.route('/details').post(getDetails)

export default Libraryrouter