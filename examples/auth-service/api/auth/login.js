const jwt = require('jsonwebtoken');

const User = require('../../model/user.model');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, isActive: true });
    const auth = user && await user.comparePassword(password.toString());

    if (!user || !auth) {
      return res.json(401, {
        message: 'Wrong Credential',
      });
    }

    res.json(200, {
      user: user.publicParse(),
      token: jwt.sign(user.publicParse(), process.env.JWT_SECRET),
    });
  } catch (err) {
    next(err);
  }
}

module.exports = login;
