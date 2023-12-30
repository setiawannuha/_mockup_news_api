/* eslint-disable max-len */
const router = require('express').Router();
const {
  create, findAll, findById, destroy, update,
} = require('../controllers/category.controller');
const {
  detailById, createCategory, updateCategory, validatorError,
} = require('../middlewares/validator.middleware');
const uploader = require('../helpers/multer');
const { authenticatation } = require('../middlewares/auth.middleware');

router.get('/', findAll);
router.get('/:id', detailById, validatorError, findById);
router.post('/', authenticatation, uploader.single('banner'), createCategory, validatorError, create);
router.put('/:id', authenticatation, uploader.single('banner'), updateCategory, validatorError, update);
router.delete('/:id', authenticatation, detailById, validatorError, destroy);

module.exports = router;
