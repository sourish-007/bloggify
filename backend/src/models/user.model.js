import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  likedBlogs: {
    type: [String],  
    default: []
  },
  followers: {
    type: [String], 
    default: []
  },
  following: {
    type: [String], 
    default: []
  },
  readHistory: {
    type: [String], 
    default: []
  },
  totalReadMinutes: {
    type: Number,
    default: 0
  },
  totalReceivedLikes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);