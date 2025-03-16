import getDataUrl from "../utils/urlGenerator.js";
import { User } from "../models/userModel.js";  // Fixed import path
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import generateToken from "../utils/generateToken.js";  // Fixed typo in generateToken

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;
        const file = req.file;

        // Check if all fields are provided
        if (!name || !email || !password || !gender || !file) {
            return res.status(400).json({
                message: "Please provide all values",
            });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Upload file to cloud storage
        const fileUrl = getDataUrl(file);

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);  // Fixed typo in bcrypt.hash

        // Upload file to Cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

        // Create the user
        user = await User.create({
            name,
            email,
            password: hashPassword,  // Fixed typo in hashPassword
            gender,
            profilePic: {  // Changed "Profilepic" to "profilePic" to match common naming conventions
                id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });

        // Generate token and send it in the response
        generateToken(user._id, res);  // Fixed to use user._id
        res.status(201).json({
            message: "User Registered",
            user,
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            message: error.message,
        });
    }
};
