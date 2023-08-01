const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name обязательное'],
    minlength: [2, 'Минимальная длина поля name - 2'],
    maxlength: [30, 'Максимальная длина поля name - 30'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Поле email обязательное'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Поле password обязательное'],
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Неправильная почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) { throw new UnauthorizedError('Неправильная почта или пароль'); }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
