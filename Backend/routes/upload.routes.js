import express from "express";
import { uploadImage } from "../controllers/upload.controller.js";
import { protect, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, uploadImage );

export default router;