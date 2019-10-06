const jwt = require('jsonwebtoken');

const User = require('../../model/user.model');

async function register(req, res, next) {
  try {
    const user = new User(req.body);

    await user.save();
    const publicData = user.publicParse();

    res.json(200, {
      token: jwt.sign(publicData, process.env.JWT_SECRET),
      user: publicData,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = register;
