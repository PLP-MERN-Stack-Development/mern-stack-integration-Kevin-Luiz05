// routes/categories.routes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getAll, create } = require('../controllers/categories.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', getAll);
router.post('/', auth, [ body('name').notEmpty() ], create);

module.exports = router;
