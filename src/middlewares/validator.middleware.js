const { body, param, validationResult } = require('express-validator');
const { forbidden } = require('../utils/response');
const { destroyFile } = require('../helpers/cloudinary');

module.exports = {
  validatorError: async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    if (req.file) {
      destroyFile(req.file);
    }
    return forbidden(res, errors.array(), 'failed');
  },
  detailById: [
    param('id', 'invalid id').isUUID(),
  ],
  registerValidator: [
    body('username', 'username cannot be empty').not().isEmpty(),
    body('phone', 'phone cannot be empty').not().isEmpty(),
    body('email', 'email cannot be empty').not().isEmpty(),
    body('email', 'invalid email').isEmail(),
    body('password', 'the minimum password length is 6 characters').isLength({ min: 6 }),
  ],
  loginValidator: [
    body('email', 'email cannot be empty').not().isEmpty(),
    body('email', 'invalid email').isEmail(),
    body('password', 'the minimum password length is 6 characters').isLength({ min: 6 }),
  ],
  createArticle: [
    body('title', 'title cannot be empty').not().isEmpty(),
    body('categoryId', 'category cannot be empty').not().isEmpty(),
    body('categoryId', 'invalid categoryId').isUUID(),
    body('body', 'body cannot be empty').not().isEmpty(),
  ],
  updateArticle: [
    param('id', 'invalid id').isUUID(),
    body('title', 'title cannot be empty').not().isEmpty(),
    body('categoryId', 'category cannot be empty').not().isEmpty(),
    body('categoryId', 'invalid categoryId').isUUID(),
    body('body', 'body cannot be empty').not().isEmpty(),
  ],
  createCategory: [
    body('title', 'title cannot be empty').not().isEmpty(),
  ],
  updateCategory: [
    param('id', 'invalid id').isUUID(),
    body('title', 'title cannot be empty').not().isEmpty(),
  ],
  updateProfile: [
    body('username', 'username cannot be empty').not().isEmpty(),
    body('phone', 'phone cannot be empty').not().isEmpty(),
  ],
  createComment: [
    param('articleId', 'invalid article id').isUUID(),
    body('comment', 'comment cannot be empty').not().isEmpty(),
  ],
  createBookmark: [
    param('articleId', 'invalid article id').isUUID(),
  ],
  destroyBookmark: [
    param('articleId', 'invalid article id').isUUID(),
  ],
  createLike: [
    param('articleId', 'invalid article id').isUUID(),
  ],
  destroyLike: [
    param('articleId', 'invalid article id').isUUID(),
  ],
};
