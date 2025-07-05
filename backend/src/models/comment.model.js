import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blogId: {
        type: String,
        required: true
    },

    commentatorId: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Comment = mongoose.model("Comment", commentSchema);