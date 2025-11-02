// controllers/posts.controller.js
const Post = require('../models/Post');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, q, category } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    const skip = (page - 1) * limit;
    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter).populate('author', 'name').populate('category', 'name')
      .sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    res.json({ total, page: Number(page), pages: Math.ceil(total / limit), posts });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name').populate('category', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { title, body, category, tags } = req.body;
    const featuredImage = req.file ? `/${req.file.path.replace(/\\/g, '/')}` : undefined;
    // if category id provided ensure exists
    let cat = null;
    if (category) {
      cat = await Category.findById(category);
      if (!cat) return res.status(400).json({ message: 'Invalid category' });
    }
    const post = new Post({ title, body, featuredImage, author: req.user._id, category: cat ? cat._id : null, tags });
    await post.save();
    res.status(201).json(post);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { title, body, category, tags } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!post.author.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    if (title) post.title = title;
    if (body) post.body = body;
    if (category) post.category = category;
    if (tags) post.tags = tags;
    if (req.file) post.featuredImage = `/${req.file.path.replace(/\\/g, '/')}`;
    await post.save();
    res.json(post);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!post.author.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    await post.deleteOne();
    res.status(204).end();
  } catch (err) { next(err); }
};

exports.addComment = async (req, res, next) => {
  try {
    const { author, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.comments.push({ author, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) { next(err); }
};
