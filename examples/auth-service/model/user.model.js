/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const SALT_ROUND = 10;

const UserSchema = new Schema({
  firstName: {
    type: String,
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    min: 8,
    max: 16,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    min: 2,
    max: 20,
    index: {
      unique: true,
    },
  },
  name: {
    type: String,
    min: 2,
    max: 40,
    index: {
      unique: true,
    },
  },
  provider: {
    type: String,
    enum: [
      'local',
      'google',
    ],
    required: true,
    default: 'local',
  },
  avatar: {
    type: String,
    required: true,
    default: 'default-avatar-url',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: 'user',
    required: true,
    enum: [
      'user',
      'admin',
    ],
  },
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_ROUND, function (genSaltErr, salt) {
    if (genSaltErr) return next(genSaltErr);

    bcrypt.hash(user.password, salt, function (hashErr, hash) {
      if (hashErr) return next(hashErr);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.publicParse = function () {
  return {
    userName: this.userName,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    avatar: this.avatar,
  };
};

module.exports = mongoose.model('User', UserSchema);
