const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: [true, 'Поле nameRU обязательное'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле nameEN обязательное'],
  },
  country: {
    type: String,
    required: [true, 'Поле country обязательное'],
  },
  director: {
    type: String,
    required: [true, 'Поле director обязательное'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле duration обязательное'],
  },
  year: {
    type: String,
    required: [true, 'Поле year обязательное'],
  },
  description: {
    type: String,
    required: [true, 'Поле description обязательное'],
  },
  image: {
    type: String,
    required: [true, 'Поле image обязательное'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле trailerLink обязательное'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле thumbnail обязательное'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  movieId: {
    type: Number,
    required: [true, 'Поле movieId обязательное'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
}, { versionKey: false });

module.exports = mongoose.model('card', movieSchema);
