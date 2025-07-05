import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  readTime: {
    type: String,
    required: true
  },
  blogId: {
    type: String,
    required: true,
    unique: true
  },
  tags: {
    type: [String],
    default: []
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const Blog = mongoose.model("Blog", blogSchema);