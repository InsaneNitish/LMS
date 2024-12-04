import { Library } from "../models/library.js";

export const addLibrary = async (req, res) => {
  const { name, address, description } = req.body;
  console.log(name, address, description);
  
  const newLibrary = new Library({ name, address, description });
  try {
    await newLibrary.save();
    res.status(201).json(newLibrary);
  } catch (error) {
}
}

export const getDetails = async (req,res)=>{
    const {libraryId} = req.body;
    try {
      const response  = await Library.findById(libraryId);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
}