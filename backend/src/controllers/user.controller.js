import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generate.token.js";

export const userSignup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) return res.status(400).json({ success: false, message: "All fields are required" });
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ success: false, message: "Username already taken" });
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create({ name, username, email, password: hashed });
    const token = generateToken(user);
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        followers: user.followers.length,
        following: user.following.length
      },
      token
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: "Email and password required" });
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ success: false, message: "Invalid credentials" });
  const token = generateToken(user);
  res.json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      followers: user.followers.length,
      following: user.following.length
    },
    token
  });
};

export const userLogout = async (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
};

export const getUserProfile = async (req, res) => {
  const user = req.user || await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      followers: user.followers.length,
      following: user.following.length,
      likedBlogs: user.likedBlogs,
      readHistory: user.readHistory,
      totalReadMinutes: user.totalReadMinutes,
      totalReceivedLikes: user.totalReceivedLikes
    }
  });
};

export const followUser = async (req, res) => {
  const targetUsername = req.params.username;
  const myUsername = req.user.username;
  if (targetUsername === myUsername) return res.status(400).json({ success: false, message: "Cannot follow yourself" });
  const target = await User.findOne({ username: targetUsername });
  if (!target) return res.status(404).json({ success: false, message: "User not found" });
  await User.findOneAndUpdate({ username: myUsername }, { $addToSet: { following: targetUsername } });
  await User.findOneAndUpdate({ username: targetUsername }, { $addToSet: { followers: myUsername } });
  res.json({ success: true, message: "Now following user" });
};

export const unfollowUser = async (req, res) => {
  const targetUsername = req.params.username;
  const myUsername = req.user.username;
  if (targetUsername === myUsername) return res.status(400).json({ success: false, message: "Cannot unfollow yourself" });
  const target = await User.findOne({ username: targetUsername });
  if (!target) return res.status(404).json({ success: false, message: "User not found" });
  await User.findOneAndUpdate({ username: myUsername }, { $pull: { following: targetUsername } });
  await User.findOneAndUpdate({ username: targetUsername }, { $pull: { followers: myUsername } });
  res.json({ success: true, message: "Unfollowed user" });
};

export const getTopAuthors = async (req, res) => {
  try {
    const authors = await User.aggregate([
      {
        $project: {
          name: 1,
          username: 1,
          followersCount: { $size: "$followers" },  
        },
      },
      {
        $sort: { followersCount: -1 },  
      },
      {
        $limit: 10,  
      },
      {
        $project: {
          name: 1,
          username: 1,
          followersCount: 1,  
        },
      },
    ]);



    res.json({ success: true, data: authors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserBlogsStats = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({
    success: true,
    data: {
      totalReadMinutes: user.totalReadMinutes,
      totalReceivedLikes: user.totalReceivedLikes
    }
  });
};
