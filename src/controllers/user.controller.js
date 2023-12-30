const argon2 = require('argon2');
const { internalError, success, failed } = require('../utils/response');
const models = require('../database/models/index');

module.exports = {
  create: async (req, res) => {
    try {
      const {
        username, email, password, phone,
      } = req.body;
      const user = await models.User.findOne({ where: { email } });
      if (user) {
        return failed(res, [
          {
            type: 'field',
            value: email,
            msg: 'email already exist',
            path: 'email',
            location: 'body',
          }], 'failed');
      }
      const hash = await argon2.hash(password);
      const payload = {
        username,
        email,
        password: hash,
        phone,
        picture: '',
        job: '',
        about: '',
        role: '1',
        emailVerifiedAt: null,
      };
      const result = await models.User.create(payload);
      return success(res, result, 'register success');
    } catch (error) {
      return internalError(res, error);
    }
  },
};
