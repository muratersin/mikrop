const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function createJwtToken(user) {
  return jwt.sign(user, jwtSecret);
}

module.exports = {
  createJwtToken,
};
