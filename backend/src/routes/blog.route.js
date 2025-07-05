import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog,
  getRecommendedBlogs,
  getRecentBlogs,
  getFeaturedBlogs,
  getUserBlogs,
  getCategories,
  incrementBlogReadTime,
  trackView
} from "../controllers/blog.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protect, createBlog);
router.post("/publish", protect, createBlog);

router.post("/:blogId/like", protect, likeBlog);
router.post("/:blogId/unlike", protect, unlikeBlog);
router.post("/:blogId/view", trackView);
router.post("/:blogId/readtime", protect, incrementBlogReadTime);

router.get("/featured", getFeaturedBlogs);
router.get("/recent", getRecentBlogs);
router.get("/categories", getCategories);
router.get("/recommended", protect, getRecommendedBlogs);
router.get("/user/:username", getUserBlogs);
router.get("/", getAllBlogs);
router.get("/:blogId", getBlogById);

router.put("/:blogId", protect, updateBlog);
router.delete("/:blogId", protect, deleteBlog);

export default router;