const User = require('../../model/user.model');

const { SELECT_USER_FIELDS } = require('../../lib/constants');

async function findById(req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      res.send(400, {
        message: 'Id is required',
      });
    }

    const user = await User.findById(id, SELECT_USER_FIELDS);

    req.set('user', user);

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = findById;
