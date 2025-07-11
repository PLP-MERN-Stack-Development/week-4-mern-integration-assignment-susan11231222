const Post = require('../models/Post');
const { validationResult } = require('express-validator');

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('category');
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('category');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const post = new Post(req.body);
  await post.save();
  res.status(201).json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json({ message: 'Post deleted' });
};
