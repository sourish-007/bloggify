import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";

export const showComments = async (req, res) => {
  try {
    const { blogid } = req.params;
    const comments = await Comment.find({ blogId: blogid }).sort({ createdAt: -1 });

    const results = await Promise.all(comments.map(async (comment) => {
      const user = await User.findOne({ username: comment.commentatorId }).select("username name");
      return {
        username: user?.username,
        name: user?.name,
        content: comment.content,
        createdAt: comment.createdAt
      };
    }));

    res.status(200).json({ comments: results });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const addComment = async (req, res) => {
    try {
        const { userid, blogid } = req.params;
        const { content } = req.body;

        if (!content || !userid || !blogid) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newComment = new Comment({
            commentatorId: userid,
            blogId: blogid,
            content: content
        });

        await newComment.save();

        res.status(201).json({ message: "Comment added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};