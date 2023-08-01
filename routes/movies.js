const router = require('express').Router();
const reqValidation = require('../utils/reqValidation');
const {
  getMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.delete('/:_id', reqValidation.id, deleteMovieById);
router.post('/', reqValidation.movie, createMovie);

module.exports = router;
