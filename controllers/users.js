const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-error');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const getThisUserById = (req, res, next) => User.findById(req.user._id)
  .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
  .then((data) => res.send(data))
  .catch(next);

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id, name, email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((data) => res.send(data))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getThisUserById,
  createUser,
  updateUserProfile,
  login,
};
