const { decode } = require('../utils/jwt');
const { unauthorized, internalError } = require('../utils/response');

module.exports = {
  authenticatation: (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;
      const decoded = decode(bearerToken);
      if (!decoded) {
        return unauthorized(res, null);
      }
      req.user = decoded;
      return next();
    } catch (error) {
      return internalError(res, error);
    }
  },
  isAdmin: (req, res, next) => {
    try {
      return next();
    } catch (error) {
      return internalError(res, error);
    }
  },
  isUser: (req, res, next) => {
    try {
      return next();
    } catch (error) {
      return internalError(res, error);
    }
  },
};
