import mongoose from "mongoose";

// Library Schema
const librarySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: String,
  });

export const Library = mongoose.model("Library",librarySchema)