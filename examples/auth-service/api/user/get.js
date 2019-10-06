const User = require('../../model/user.model');

const { SELECT_USER_FIELDS } = require('../../lib/constants');

async function get(req, res, next) {
  try {
    const { page, limit } = req.query;
    const user = req.get('user');

    if (user) {
      return res.json(200, user);
    }

    delete req.query.page;
    delete req.query.limit;

    const query = {
      ...req.query,
      isActive: true,
    };

    const users = await User.find(query)
      .select(SELECT_USER_FIELDS)
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      data: users,
      page: {
        page,
        limit,
        total,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = get;
