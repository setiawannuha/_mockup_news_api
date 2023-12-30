const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

module.exports = {
  sign: (data) => {
    const token = `Bearer ${jwt.sign(data, JWT_SECRET, { expiresIn: '14d' })}`;
    return token;
  },
  decode: (bearerToken) => {
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  },
};
