/* eslint-disable max-len */
const router = require('express').Router();
const {
  create,
} = require('../controllers/article.comment.controller');
const {
  createComment, validatorError,
} = require('../middlewares/validator.middleware');
const { authenticatation } = require('../middlewares/auth.middleware');

router.post('/:articleId', authenticatation, createComment, validatorError, create);

module.exports = router;
