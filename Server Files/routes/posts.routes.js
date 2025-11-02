// routes/posts.routes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const posts = require('../controllers/posts.controller');

router.get('/', posts.getAll);
router.get('/:id', posts.getById);
router.post('/', auth, upload.single('featuredImage'), [
  body('title').notEmpty(),
  body('body').notEmpty()
], posts.create);

router.put('/:id', auth, upload.single('featuredImage'), posts.update);
router.delete('/:id', auth, posts.delete);
router.post('/:id/comments', [ body('author').notEmpty(), body('content').notEmpty() ], posts.addComment);

module.exports = router;
