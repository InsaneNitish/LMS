import express from "express";
import { addLibrary } from "../controller/libraryController.js";

const Libraryrouter = express.Router();

Libraryrouter.route('/create').post(addLibrary)
Libraryrouter.route('/details').get(addLibrary)

export default Libraryrouter