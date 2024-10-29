import session from "express-session";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";

dotenv.config();

export const sessionMiddleware = session({
    secret : process.env.SECRETKEY,
    resave : false,
    saveUninitialized : false,
    store : MongoStore.create({mongoUrl : process.env.MONGODBURL}),
    cookie : {
        maxAge : 1000 * 60 * 60 * 24 
    },
})
