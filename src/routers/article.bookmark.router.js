/* eslint-disable max-len */
const router = require('express').Router();
const {
  create, byProfile, destroy,
} = require('../controllers/article.bookmark.controller');
const {
  createBookmark, destroyBookmark, validatorError,
} = require('../middlewares/validator.middleware');
const { authenticatation } = require('../middlewares/auth.middleware');

router.post('/:articleId', authenticatation, createBookmark, validatorError, create);
router.delete('/:articleId', authenticatation, destroyBookmark, validatorError, destroy);
router.get('/my-bookmark', authenticatation, byProfile);

module.exports = router;
