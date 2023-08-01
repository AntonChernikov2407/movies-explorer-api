const { celebrate, Joi } = require('celebrate');
const pattern = require('./urlPattern');

const signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});

const signup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const me = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const id = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

const movie = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(pattern),
    trailerLink: Joi.string().required().regex(pattern),
    thumbnail: Joi.string().required().regex(pattern),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  signin,
  signup,
  me,
  id,
  movie,
};
