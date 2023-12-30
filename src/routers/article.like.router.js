/* eslint-disable max-len */
const router = require('express').Router();
const {
  create, destroy,
} = require('../controllers/article.like.controller');
const {
  createLike, destroyLike, validatorError,
} = require('../middlewares/validator.middleware');
const { authenticatation } = require('../middlewares/auth.middleware');

router.post('/:articleId', authenticatation, createLike, validatorError, create);
router.delete('/:articleId', authenticatation, destroyLike, validatorError, destroy);

module.exports = router;
