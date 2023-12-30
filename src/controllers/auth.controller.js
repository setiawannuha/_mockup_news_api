const argon2 = require('argon2');
const {
  internalError, successAuth, failed, success,
} = require('../utils/response');
const passport = require('../helpers/passport');
const models = require('../database/models/index');
const { sign } = require('../utils/jwt');

module.exports = {
  google: async (req, res, next) => {
    req.session.redirectUrl = req.query.redirect;
    passport.authenticate('google', { session: true, scope: ['profile', 'email'] })(req, res, next);
  },
  googleCallback: async (req, res) => {
    try {
      return res.json({
        data: req.user,
      });
    } catch (error) {
      return internalError(res, error);
    }
  },
  googleFailed: async (req, res) => {
    try {
      return internalError(res, 'failed login via google, please try again or contact admin');
    } catch (error) {
      return internalError(res, error);
    }
  },
  byEmail: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        return failed(res, null, 'email or password wrong');
      }
      const verified = await argon2.verify(user.password, password);
      if (!verified) {
        return failed(res, null, 'email or password wrong');
      }
      delete user.dataValues.password;
      const token = sign(user.dataValues);
      return successAuth(res, user, token, 'login success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  me: async (req, res) => {
    try {
      const { id } = req.user;
      const result = await models.User.findByPk(id);
      delete result.dataValues.password;
      return success(res, result, 'get profile success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.user;
      const {
        username, phone, job, about,
      } = req.body;
      const payload = {
        username,
        phone,
        job,
        about,
      };
      const result = await models.User.update(payload, { where: { id } });
      return success(res, result, 'update profile success');
    } catch (error) {
      return internalError(res, error);
    }
  },
  changeProfile: async (req, res) => {
    try {
      const { id } = req.user;
      if (!req.file) {
        return failed(res, [
          {
            type: 'field',
            value: '',
            msg: 'picture cannot be empty',
            path: 'picture',
            location: 'body',
          },
        ], 'update profile picture failed');
      }
      const payload = {
        picture: req.file.path,
      };
      const result = await models.User.update(payload, { where: { id } });
      return success(res, result, 'update profile picture success');
    } catch (error) {
      return internalError(res, error);
    }
  },
};
