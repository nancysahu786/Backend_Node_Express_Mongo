import express from "express";
import {
  createBlog,
  deleteBlogById,
  getAllBlog,
  getBlogById,
  updateBlog,
} from "../controllers/blog.controller.js";
const router = express.Router();

// All bolgs
router.get("/", getAllBlog);

//blogs by id
router.get("/:blogId", getBlogById);

router.post("/", createBlog);

router.put("/:blogId", updateBlog);

router.delete("/:blogId", deleteBlogById);

export default router;
