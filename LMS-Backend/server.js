import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRouter from "./routes/bookRoute.js";
import Libraryrouter from "./routes/libraryRoute.js";
import adminRouter from "./routes/adminRoute.js";
import userRouter from "./routes/userRoute.js";

// configuring the env file
dotenv.config();

const port = 3000;
const app = express()

app.use(express.json())
app.use(cors({
    origin  : '*',
    credentials : true,
}));


mongoose.connect(process.env.MONGODBURL,{}).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.error('MongoDB connection error:', error);
})




// routes defined gere
app.use("/api/books", bookRouter);
app.use('/api/library',Libraryrouter);
app.use('/api/admin',adminRouter);
app.use('/api/user',userRouter);


//test get route
app.get('/test',(req,res)=>{
    res.status(201).json({msg : "test get route running here"})
})




app.listen(process.env.PORT || port,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})