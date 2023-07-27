const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const ValidationError = require('../errors/validation-error');

const getMovies = (req, res, next) => Movie.find({})
  .populate('owner')
  .then((data) => res.send(data))
  .catch(next);

const deleteMovieById = (req, res, next) => Movie.findById(req.params._id)
  .orFail(new NotFoundError('Фильм с указанным id не найден'))
  .then((movie) => {
    const movieOwner = movie.owner.toString();
    if (movieOwner !== req.user._id) {
      throw new ForbiddenError('Вы не можете удалять фильмы других пользователй');
    }
    return Movie.findByIdAndRemove(req.params._id)
      .then(() => res.send({ message: 'Фильм удален' }))
      .catch(next);
  })
  .catch(next);

const createMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
  } = req.body;

  return Movie.create({
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((data) => data
      .populate('owner')
      .then(() => res.status(201).send(data)))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  deleteMovieById,
  createMovie,
};
