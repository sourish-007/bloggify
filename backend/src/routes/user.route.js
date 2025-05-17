import { Router } from "express";
import {
  userSignup,
  userLogin,
  userLogout,
  getUserProfile,
  followUser,
  unfollowUser,
  getTopAuthors,
  getUserBlogsStats
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/logout", protect, userLogout);

router.get("/top-authors", getTopAuthors);
router.get("/:username/stats", getUserBlogsStats);

router.get("/profile", protect, getUserProfile);
router.get("/:username", getUserProfile);

router.post("/:username/follow", protect, followUser);
router.post("/:username/unfollow", protect, unfollowUser);

export default router;