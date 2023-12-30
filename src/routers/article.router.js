/* eslint-disable max-len */
const router = require('express').Router();
const {
  create, findAll, findById, destroy, update, byProfile, byCategory, latest, byUserId,
} = require('../controllers/article.controller');
const {
  detailById, createArticle, updateArticle, validatorError,
} = require('../middlewares/validator.middleware');
const uploader = require('../helpers/multer');

const { authenticatation } = require('../middlewares/auth.middleware');

router.get('/', findAll);
router.get('/latest', latest);
router.get('/:id', detailById, validatorError, findById);
router.get('/user/:id', detailById, validatorError, byUserId);
router.get('/me/list', authenticatation, byProfile);
router.get('/category/:id', authenticatation, detailById, validatorError, byCategory);
router.post('/', authenticatation, uploader.single('banner'), createArticle, validatorError, create);
router.put('/:id', authenticatation, uploader.single('banner'), updateArticle, validatorError, update);
router.delete('/:id', authenticatation, detailById, validatorError, destroy);

module.exports = router;
