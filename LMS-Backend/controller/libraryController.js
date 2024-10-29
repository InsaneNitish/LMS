import { Library } from "../models/library.js";

export const addLibrary = async (req, res) => {
  const { name, address, description } = req.body;
  const newLibrary = new Library({ name, address, description });
  try {
    await newLibrary.save();
    res.status(201).json(newLibrary);
  } catch (error) {
}
}

export const getDetails = async (req,res)=>{
  
}