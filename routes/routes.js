import express from "express";
import auth from "./auth/auth.js"; // Ensure you use the correct file extension

const router = express.Router();

router.use("/user", auth);

export default router;
