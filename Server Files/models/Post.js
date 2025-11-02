// models/Post.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  body: { type: String, required: true },
  featuredImage: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [String],
  comments: [CommentSchema]
}, { timestamps: true });

// text index for search
PostSchema.index({ title: 'text', body: 'text' });

module.exports = mongoose.model('Post', PostSchema);
