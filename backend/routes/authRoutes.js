import express  from "express";
import { registerUser } from "../controllers/authcontrollers";
import uploadFile from "../middleware/multer.js";
const router =express.Router();
router.post("/register",uploadFile,registerUser);
export default router;