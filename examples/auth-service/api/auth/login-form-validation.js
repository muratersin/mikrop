
function loginFormValidation(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json(400, {
      message: 'Missing email or password',
    });
  }

  next();
}

module.exports = loginFormValidation;
