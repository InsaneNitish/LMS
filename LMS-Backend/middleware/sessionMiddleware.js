import session from "express-session";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";

dotenv.config();
const store = MongoStore.create({
    mongoUrl: process.env.MONGODBURL,
    collectionName: 'sessions',
    touchAfter: 24 * 3600,
    autoRemove: 'native',
});


export const sessionMiddleware = session({
    secret : process.env.SECRETKEY,
    resave : false,
    saveUninitialized : false,
    store : store,
    cookie: {
        httpOnly: true,
        maxAge: 86400000, // 1 day
        sameSite: "lax",  // Ensures cookies are sent with normal requests (adjust as needed)
        secure: false,    // Disable in development if not using HTTPS
    }
})
