module.exports = {
  mikropConf: {
    useMongo: true,
    requiredVariables: [
      'MONGODB_URI',
    ],
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtSign: {
    expiresIn: 3600,
    algorithm: 'HS256',
  },
};
