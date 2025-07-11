const express = require('express');
const router = express.Router();
const {
  getPosts, getPostById, createPost, updatePost, deletePost,
} = require('../controllers/postController');
const { validatePost } = require('../middleware/validators');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', validatePost, createPost);
router.put('/:id', validatePost, updatePost);
router.delete('/:id', deletePost);

module.exports = router;
