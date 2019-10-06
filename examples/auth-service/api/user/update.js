async function update(req, res, next) {
  try {
    const user = Object.assign(req.get('user'), req.body);

    delete user.password;

    await user.save();

    res.json(200, user);
  } catch (err) {
    next(err);
  }
}

module.exports = update;
