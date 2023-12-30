/* eslint-disable max-len */
const router = require('express').Router();
const passport = require('../helpers/passport');
const {
  googleCallback, googleFailed, google, byEmail, me, update, changeProfile,
} = require('../controllers/auth.controller');
const { create } = require('../controllers/user.controller');
const { authenticatation } = require('../middlewares/auth.middleware');
const {
  registerValidator, loginValidator, updateProfile, validatorError,
} = require('../middlewares/validator.middleware');
const uploader = require('../helpers/multer');

// router.get('/google', google, passport.authenticate('google', { session: true, scope: ['profile', 'email'] }));
router.get('/google', google);
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/auth/google/failed' }), googleCallback);
// router.get('/google/callback', googleCallback);
router.get('/google/failed', googleFailed);

router.post('/register', registerValidator, validatorError, create);
router.post('/login', loginValidator, validatorError, byEmail);
router.get('/me', authenticatation, me);
router.put('/update', authenticatation, updateProfile, validatorError, update);
router.put('/update/picture', authenticatation, uploader.single('picture'), changeProfile);

module.exports = router;
