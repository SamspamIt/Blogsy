import express from "express";
import {getAllBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog} from "../controllers/blog.controller.js";
import {protect, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

//Route for public without login

router.get("/", getAllBlogs );
router.get("/:slug", getBlogBySlug );

// Route for Admin (CRUD)

router.post("/", protect, isAdmin, createBlog );
router.put("/:id", protect, isAdmin, updateBlog );
router.delete("/:id", protect, isAdmin, deleteBlog );

export default router;