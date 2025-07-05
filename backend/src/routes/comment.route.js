import { Router } from "express";
import { showComments, addComment } from "../controllers/comment.controller.js";

const router = Router();

router.get("/:blogid/view-comments", showComments);
router.post("/:userid/:blogid/add-comment", addComment);

export default router;