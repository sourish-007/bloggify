import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";

const generateBlogId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, body, tags } = req.body;
    const blogId = generateBlogId();
    const author = req.user?.username || 'Unknown';

    const readTime = (() => {
      const wordsPerMinute = 200;
      const words = (body || '').trim().split(/\s+/).length;
      const mins = Math.ceil(words / wordsPerMinute);
      return `${mins} min read`;
    })();

    const blog = await Blog.create({
      blogId,
      title,
      excerpt,
      body,
      author,
      date: new Date().toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric"
      }),
      readTime,
      tags: Array.isArray(tags) ? tags : [],
      featured: false,
      likes: 0,
      views: 0
    });

    return res.status(201).json({ success: true, data: blog });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const total = await Blog.countDocuments();
  const blogs = await Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  res.json({ success: true, data: blogs, page, totalPages: Math.ceil(total / limit) });
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({ blogId: req.params.blogId }).lean();
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    
    await Blog.findOneAndUpdate({ blogId: req.params.blogId }, { $inc: { views: 1 } });
    
    const authorUser = await User.findOne({ name: blog.author }).lean();
    const authorUsername = authorUser ? authorUser.username : null;
    
    let likedByUser = false;
    let authorFollowing = false;
    
    if (req.user) {
      await User.findOneAndUpdate({ username: req.user.username }, { $addToSet: { readHistory: blog.blogId } });
      
      const currentUser = await User.findOne({ username: req.user.username }).lean();
      if (currentUser && authorUsername) {
        likedByUser = currentUser.likedBlogs.includes(blog.blogId);
        authorFollowing = currentUser.following.includes(authorUsername);
      }
    }
    
    const response = {
      ...blog,
      authorUsername,
      likedByUser,
      authorFollowing
    };
    
    res.json({ success: true, data: response });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateBlog = async (req, res) => {
  const blog = await Blog.findOneAndUpdate({ blogId: req.params.blogId }, { $set: req.body }, { new: true, runValidators: true });
  if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
  res.json({ success: true, data: blog });
};

export const deleteBlog = async (req, res) => {
  const blog = await Blog.findOneAndDelete({ blogId: req.params.blogId });
  if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
  res.json({ success: true, message: "Blog deleted" });
};

export const likeBlog = async (req, res) => {
  const blog = await Blog.findOne({ blogId: req.params.blogId });
  if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
  if (!req.user.likedBlogs.includes(blog.blogId)) {
    await User.findOneAndUpdate({ username: req.user.username }, { $addToSet: { likedBlogs: blog.blogId } });
    blog.likes += 1;
    await blog.save();
    await User.findOneAndUpdate({ username: blog.author }, { $inc: { totalReceivedLikes: 1 } });
  }
  res.json({ success: true, data: blog });
};

export const unlikeBlog = async (req, res) => {
  const blog = await Blog.findOne({ blogId: req.params.blogId });
  if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
  if (req.user.likedBlogs.includes(blog.blogId)) {
    await User.findOneAndUpdate({ username: req.user.username }, { $pull: { likedBlogs: blog.blogId } });
    blog.likes = Math.max(blog.likes - 1, 0);
    await blog.save();
    await User.findOneAndUpdate({ username: blog.author }, { $inc: { totalReceivedLikes: -1 } });
  }
  res.json({ success: true, data: blog });
};

export const getFeaturedBlogs = async (req, res) => {
  const blogs = await Blog.find({ featured: true }).sort({ createdAt: -1 }).limit(5).lean();
  res.json({ success: true, data: blogs });
};

export const getRecentBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(10).lean();
  res.json({ success: true, data: blogs });
};

export const getUserBlogs = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).lean();
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const name = user.name;

  const blogs = await Blog.find({
    $or: [
      { author: username },  
      { author: name }       
    ]
  })
  .sort({ createdAt: -1 })
  .lean();

  return res.json({ success: true, data: blogs });
};

export const getRecommendedBlogs = async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).lean();
  const tagCounts = {};
  const read = await Blog.find({ blogId: { $in: user.readHistory } }).lean();
  read.forEach(b => b.tags.forEach(t => tagCounts[t] = (tagCounts[t] || 0) + 1));
  const topTag = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])[0];
  const recommended = await Blog.find({ tags: topTag, blogId: { $nin: user.readHistory } })
    .sort({ featured: -1, likes: -1, views: -1 })
    .limit(5)
    .lean();
  res.json({ success: true, data: recommended });
};

export const trackView = async (req, res) => {
  const blog = await Blog.findOneAndUpdate({ blogId: req.params.blogId }, { $inc: { views: 1 } }, { new: true });
  res.json({ success: true, data: blog });
};

export const incrementBlogReadTime = async (req, res) => {
  const { minutes } = req.body;
  const blog = await Blog.findOne({ blogId: req.params.blogId });
  if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
  await User.findOneAndUpdate({ username: blog.author }, { $inc: { totalReadMinutes: minutes } });
  res.json({ success: true });
};

export const getCategories = async (req, res) => {
  const agg = await Blog.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $project: { name: "$_id", count: 1, _id: 0 } },
    { $sort: { count: -1 } }
  ]);
  res.json({ success: true, data: agg });
};