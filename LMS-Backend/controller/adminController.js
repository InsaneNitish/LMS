import { Admin } from "../models/admin.js";
import jwt from "jsonwebtoken";
import dotenv  from "dotenv";
import Id from "objectid";

dotenv.config();

//admin registering controller
export const adminRegister = async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    console.log(newAdmin);
    await newAdmin.save();
    res.status(200).json(newAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
};

//admin login controller

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({
        msg: "No Admin with this email found. Check Your Credentials.",
      });
    } else {
      if(password!==admin.password){
        res.status(404).json({msg : "Password is incorrect!"})
      }
      else{
        let token = jwt.sign({email : email},process.env.SECRETKEY,{expiresIn : '1h'})

        // session info to be saved here
        req.session.admin={
          id : admin._id,
          email : admin.email,
          libraryId : admin.libraryId,
          token : token,
        }


        res.status(200).json({msg : "Login Successful",token : token})
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
