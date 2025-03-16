import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';
import cloudinary from "cloudinary"
dotenv.config();

cloudinary.v2.config({
    cloud_name:process.env.Cloudinary_Cloud_name,
    api_key:process.env.Cloudinary_Api,
    api_secret:process.env.Cloudinary_Secret,
});

const app = express();
//using middle ware
app.use(express.json());
const port= process.env.PORT;
app.get("/",(req,res)=>{
    res.send('server working perfectly');
});
//importing the routes
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/userRoutes.js"
//using routes
app.use("/api/user",userRoutes);
app.use("/api/user",authRoutes);
app.use("/api/user",postRoutes);
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
    connectDb();
});

