
const requiredFields = [
  'userName',
  'password',
  'email',
];

function registerFormValidation(req, res, next) {
  for (let i = 0; i < requiredFields.length; i += 1) {
    const fieldName = requiredFields[i];
    if (!req.body[fieldName]) {
      return res.json(400, {
        message: `Missing field: ${fieldName}`,
      });
    }
  }

  next();
}

module.exports = registerFormValidation;
